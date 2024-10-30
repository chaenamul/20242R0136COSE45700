import React, { useState, useEffect, useRef } from "react";
import { Event, socket } from "socket/socket";
import { Box, Button, Stack, TextField } from "@mui/material";

function Chatbox() {
  const [text, setText] = useState('');
  const [chats, setChats] = useState([]);
	const [newUsername, setNewUsername] = useState(socket.id);
	const [username, setUsername] = useState(socket.id);
  const bottomRef = useRef(null);

	// send message
  function sendMessage(username, text) {
    socket.emit(Event.SENDMESSAGE, { username: username, text: text });
    setText('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && text.trim()) {
      sendMessage(username, text);
    }
  };

	// receive message
	useEffect(() => {
		function onReceiveMessage(text) {
      setChats(chats.concat(text));
    	bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
		socket.on(Event.RECEIVEMESSAGE, onReceiveMessage);
		return () => {
			socket.off(Event.RECEIVEMESSAGE, onReceiveMessage);
		}
	}, [chats])
	
	// change username
	useEffect(() => {
		function onChangeUsername(string) {
      setUsername(string);
			setNewUsername(string);
		}
		socket.on(Event.CHANGEUSERNAME, onChangeUsername);
		return () => {
			socket.off(Event.CHANGEUSERNAME, onChangeUsername);
		}
	}, [username])

  return (
		<Box>
			<Stack sx={{ flexDirection: 'row', gap: '10px'}}>
				<TextField
					value={newUsername}
					onChange={(e) => setNewUsername(e.target.value)}
					placeholder="enter new username"
				/>
				<Button onClick={() => {socket.emit(Event.CHANGEUSERNAME, newUsername)}}> Change Username</Button>
			</Stack>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
      />
			<Stack>
				{
					chats.map((chat, index) =>
							<Box key={ index }>{ chat }</Box>
					)
				}
				<Box ref={bottomRef} />
			</Stack>
		</Box>
  );
}

export default Chatbox;
