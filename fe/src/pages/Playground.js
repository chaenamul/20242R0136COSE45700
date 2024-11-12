import React, { useState, useEffect } from "react";
// import { Event, socket } from "socket/socket";
import { useSocket } from 'contexts/SocketContext';
import { Box, Button, TextField } from "@mui/material";
import Chatbox from "components/Chatbox";


function Playground() {
  // const socket = useSocket();
  const [username, setUsername] = useState(null)

  // useEffect(() => {
    
  // }, [])
  return (
    <Box>
      {/* <Button variant="outlined" onClick={() => {
        socket.emit('joinRoom', )
      }}>Join Random Room</Button> */}
      <Chatbox />
    </Box>
  );
}

export default Playground;
