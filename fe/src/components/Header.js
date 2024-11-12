import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "socket/socket";
import { Box, Stack, Button, TextField, Typography } from "@mui/material";
import { PATHS } from "routes/paths";
import { useSocket } from "contexts/SocketContext";

function Header() {
  const socket = useSocket();
  const navigate = useNavigate();

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
      <Stack sx={{ flexDirection: 'row', gap: '10px' }}>
        <Button onClick={() => {socket.emit('join_game')}}>Connect</Button>
        <Button onClick={() => {socket.emit('leave_game')}}>Disconnect</Button>
      </Stack>
    </Stack>
  );
}

export default Header;
