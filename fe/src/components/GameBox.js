import React, { useState, useEffect, useRef } from 'react';
import { Event } from 'socket/socket';
import { Box, Button, Typography, Paper, Stack, TextField } from "@mui/material";
import { useSocket } from 'contexts/SocketContext';

const GameBox = () => {
	const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({});
  const [isOnline, setIsOnline] = useState(false);
  const bottomRef = useRef(null);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected with ID:', socket.id);
      socket.emit('register_username', { username: username });
    });

    socket.on('check_online', (data) => {
      setIsOnline(data.isOnline);
      setUserData(data.userData);
      console.log('userData: ', data.userData);
    })
		
    // Event listener for receiving messages
    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setTimeout(() => {
    	  bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 10);
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('check_online');
      socket.off('receive_message');
    };
  }, [socket]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);  // Update username in state
  };
  
  // Handle Enter key press for sending messages
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     if (e.shiftKey) {
  //       setMessage((prevMessage) => prevMessage + "\n");  // Shift+Enter inserts a newline
  //     } else {
  //       e.preventDefault();  // Prevent new line on Enter
  //       handleSendMessage();
  //     }
  //   }
  // };

  return (
    <Box>
      {/* <Typography variant="h5" gutterBottom>
        Game
      </Typography> */}
      <Stack sx={{ flexDirection: "row", padding: 2, gap: "10px" }}>
        <Box>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            disabled={isOnline}
            onChange={handleUsernameChange}
          />
        </Box>
        <Button variant="outlined" onClick={() => {socket.emit('join_lobby')}}>Join Lobby</Button>
      </Stack>
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
      <Stack sx={{ flexDirection: "row" }}>
        <Button>Act 1</Button>
        <Button>Act 1</Button>
        <Button>Act 1</Button>
      </Stack>

    </Box>
  );
};

export default GameBox;
