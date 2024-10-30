import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event, socket } from "socket/socket";
import { Box, Stack, Button, Typography } from "@mui/material";
import { PATHS } from "routes/paths";

function Header({ isConnected }) {
  const navigate = useNavigate();

  // socket
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <Stack sx={{ backgroundColor: 'lightgrey', p: '20px', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Stack sx={{ flexDirection: 'row', gap: '10px' }}>
        <Box onClick={() => navigate(PATHS.main)}>
          <Typography variant="h4">Main</Typography>
        </Box>
        <Box onClick={() => navigate(PATHS.playground)}>
          <Typography variant="h4">Playground</Typography>
        </Box>
      </Stack>
      <Stack sx={{ flexDirection: 'row', gap: '10px' }}>
        <Button variant={isConnected ? "contained" : "outlined"} onClick={ connect }>Connect</Button>
        <Button variant={isConnected ? "outlined" : "contained"} onClick={ disconnect }>Disconnect</Button>
      </Stack>
    </Stack>
  );
}

export default Header;
