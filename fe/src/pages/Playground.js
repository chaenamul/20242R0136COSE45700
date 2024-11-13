import React, { useState, useEffect } from "react";
// import { Event, socket } from "socket/socket";
import { useSocket } from 'contexts/SocketContext';
import { Box, Button, TextField } from "@mui/material";
import Chatbox from "components/Chatbox";


function Playground() {

  // useEffect(() => {
    
  // }, [])
  return (
    <Box>
      <Box sx={{ width: "50%", pl: 2}}>
        <Chatbox />
      </Box>
    </Box>
  );
}

export default Playground;
