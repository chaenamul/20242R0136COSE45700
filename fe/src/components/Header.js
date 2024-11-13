import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "socket/socket";
import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import { PATHS } from "routes/paths";
import { useSocket } from "contexts/SocketContext";

function Header() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  
  // Listen for username update
  useEffect(() => {
    if (!socket) return;

    // Listen for initial username from server
    socket.on(Event.SET_USERNAME, (data) => {
      setUsername(data.username);  // Set the initial username
    });

    // Clean up listeners on unmount
    return () => {
      socket.off(Event.SET_USERNAME);
    };
  }, [socket]);

  // Handle nickname change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);  // Update username in state
  };

  // Emit the change_username event to the server
  const handleUsernameBlur = () => {
    socket.emit(Event.CHANGE_USERNAME, username);  // Emit username change to server
  };


  return (
    <Stack sx={{ width: '100%', backgroundColor: 'lightgrey', p: '20px', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Stack sx={{ flexDirection: 'row', gap: '10px' }}>
        <Box onClick={() => navigate(PATHS.main)}>
          <Typography variant="h6">Main</Typography>
        </Box>
        <Box onClick={() => navigate(PATHS.playground)}>
          <Typography variant="h6">Playground</Typography>
        </Box>
      </Stack>
      <Stack sx={{ height: '40px', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
        <Box>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            onBlur={handleUsernameBlur}
          />
        </Box>
        <Button onClick={() => {socket.emit('debug', { game: '/game1' })}}>Debug</Button>
        <Button onClick={() => {socket.emit('join_game')}}>Connect</Button>
        <Button onClick={() => {socket.emit('leave_game')}}>Disconnect</Button>
      </Stack>
    </Stack>
  );
}

export default Header;
