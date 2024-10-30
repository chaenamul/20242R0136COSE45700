import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event, socket } from "socket/socket";
import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import { PATHS } from "routes/paths";

function Header({ isConnected }) {
  const navigate = useNavigate();
	const [newUsername, setNewUsername] = useState(socket.id);
	// const [username, setUsername] = useState(socket.id);

  // socket
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }
  
	// change username
	// useEffect(() => {
	// 	function onChangeUsername(string) {
  //     setUsername(string);
	// 		setNewUsername(string);
	// 	}
	// 	socket.on(Event.CHANGEUSERNAME, onChangeUsername);
	// 	return () => {
	// 		socket.off(Event.CHANGEUSERNAME, onChangeUsername);
	// 	}
	// }, [username])

  return (
    <Stack sx={{ width: '100%', backgroundColor: 'lightgrey', p: '20px', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Stack sx={{ flexDirection: 'row', gap: '10px' }}>
        <Box onClick={() => navigate(PATHS.main)}>
          <Typography variant="h6">Main</Typography>
        </Box>
        <Box onClick={() => navigate(PATHS.playground)}>
          <Typography variant="h6">Playground</Typography>
        </Box>
				<TextField
					value={newUsername}
					onChange={(e) => setNewUsername(e.target.value)}
					placeholder="enter new username"
				/>
				<Button variant="contained" onClick={() => {socket.emit(Event.CHANGEUSERNAME, newUsername)}}> Change Username</Button>
      </Stack>
      <Stack sx={{ flexDirection: 'row', gap: '10px' }}>
        <Button variant={isConnected ? "contained" : "outlined"} onClick={ connect }>Connect</Button>
        <Button variant={isConnected ? "outlined" : "contained"} onClick={ disconnect }>Disconnect</Button>
      </Stack>
    </Stack>
  );
}

export default Header;
