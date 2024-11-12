import React, { useState, useEffect, useRef } from 'react';
import { Event } from 'socket/socket';
import { Box, Button, Typography, Paper, Stack, TextField } from "@mui/material";
import { useSocket } from 'contexts/SocketContext';

const ChatBox = () => {
	const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");  // Username state
  const bottomRef = useRef(null);

  // Listen for incoming messages
  useEffect(() => {
    // Event listener for receiving messages
    socket.on(Event.RECEIVE_MESSAGE, (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setTimeout(() => {
    	  bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 10);
    });

    // Clean up listeners on unmount
    return () => {
      socket.off(Event.RECEIVE_MESSAGE);
    };
  }, [socket]);
  
  // Listen for username update
  useEffect(() => {
    // Listen for initial username from server
    socket.on(Event.SET_USERNAME, (data) => {
      setUsername(data.username);  // Set the initial username
    });

    // Clean up listeners on unmount
    return () => {
      socket.off(Event.SET_USERNAME);
    };
  }, [socket]);

  // Handle message change with Shift+Enter for new lines
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle Enter key press for sending messages
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        setMessage((prevMessage) => prevMessage + "\n");  // Shift+Enter inserts a newline
      } else {
        e.preventDefault();  // Prevent new line on Enter
        handleSendMessage();
      }
    }
  };

  // Handle nickname change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);  // Update username in state
  };

  // Emit the change_username event to the server
  const handleUsernameBlur = () => {
    socket.emit(Event.CHANGE_USERNAME, username);  // Emit username change to server
  };

  // Send the message to the server
  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit(Event.SEND_MESSAGE, message);  // Send message to server
      setMessage("");  // Clear input after sending
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Chat Room
      </Typography>
      
      <Paper 
        elevation={3} 
        sx={{
          border: "1px solid #ccc",
          padding: 2,
          marginBottom: 2,
          height: "60vh",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <Box key={index}>
            <Typography variant="body1">
              <strong>{msg.sender}:</strong> {msg.text}
            </Typography>
          </Box>
        ))}
        <div ref={bottomRef} />
      </Paper>

      <Box mb={2}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          onBlur={handleUsernameBlur}
          margin="normal"
        />
      </Box>

      <TextField
        placeholder="Type your message..."
        variant="outlined"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={socket.disconnected}
        fullWidth
        multiline
        rows={2}
        sx={{
          width: "50%",
          marginBottom: 2
        }}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSendMessage} 
        disabled={!message.trim()}
      >
        Send
      </Button>
    </Box>
  );
};

export default ChatBox;

// import React, { useState, useEffect, useRef } from "react";
// import { Event, socket } from "socket/socket";
// import { Box, Button, Stack, TextField } from "@mui/material";

// function Chatbox() {
//   const [text, setText] = useState('');
//   const [chats, setChats] = useState([]);
// 	const [newUsername, setNewUsername] = useState(socket.id);
// 	const [username, setUsername] = useState(socket.id);
//   const bottomRef = useRef(null);

// 	// send message
//   function sendMessage(username, text) {
//     socket.emit(Event.SENDMESSAGE, { username: username, text: text });
//     setText('');
//   }

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && text.trim()) {
//       sendMessage(username, text);
//     }
//   };

// 	// receive message
// 	useEffect(() => {
// 		function onReceiveMessage(text) {
//       setChats(chats.concat(text));
//     	bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
// 		}
// 		socket.on(Event.RECEIVEMESSAGE, onReceiveMessage);
// 		return () => {
// 			socket.off(Event.RECEIVEMESSAGE, onReceiveMessage);
// 		}
// 	}, [chats])

// 	// update user list
// 	useEffect(() => {
// 		function onReceiveMessage(text) {
//       setChats(chats.concat(text));
//     	bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
// 		}
// 		socket.on(Event.RECEIVEMESSAGE, onReceiveMessage);
// 		return () => {
// 			socket.off(Event.RECEIVEMESSAGE, onReceiveMessage);
// 		}
// 	}, [chats])
	
// 	// // change username
// 	// useEffect(() => {
// 	// 	function onChangeUsername(string) {
//   //     setUsername(string);
// 	// 		setNewUsername(string);
// 	// 	}
// 	// 	socket.on(Event.CHANGEUSERNAME, onChangeUsername);
// 	// 	return () => {
// 	// 		socket.off(Event.CHANGEUSERNAME, onChangeUsername);
// 	// 	}
// 	// }, [username])

//   return (
// 		<Box>
// 			{/* <Stack sx={{ flexDirection: 'row', gap: '10px'}}>
// 				<TextField
// 					value={newUsername}
// 					onChange={(e) => setNewUsername(e.target.value)}
// 					placeholder="enter new username"
// 				/>
// 				<Button onClick={() => {socket.emit(Event.CHANGEUSERNAME, newUsername)}}> Change Username</Button>
// 			</Stack> */}
//       <TextField
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Type a message"
//       />
// 			<Stack sx={{ height: 400, width: 400, backgroundColor: "lightgrey", overflow: "scroll" }}>
// 				{
// 					chats.map((chat, index) =>
// 							<Box key={ index } sx={{ backgroundColor: index % 2 === 0 ? "white" : "lightgrey"}}>{ chat }</Box>
// 					)
// 				}
// 				<Box ref={bottomRef} />
// 			</Stack>
// 		</Box>
//   );
// }

// export default Chatbox;
