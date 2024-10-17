import React from 'react';
import { socket } from 'socket/socket';
import { Box, Stack, Button } from '@mui/material'

export function ConnectionManager({ isConnected }) {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <Stack sx={{ p: '20px', flexDirection: 'row', gap: '10px' }}>
      <Button variant={isConnected ? "contained" : "outlined"} onClick={ connect }>Connect</Button>
      <Button variant={isConnected ? "outlined" : "contained"} onClick={ disconnect }>Disconnect</Button>
    </Stack>
  );
}