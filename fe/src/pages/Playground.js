import React, { useState } from "react";
import { Event, socket } from "socket/socket";
import { Box, Button, TextField } from "@mui/material";
import Chatbox from "components/Chatbox";


function Playground() {
  const [text, setText] = useState('');

  function sendMessage(text) {
    socket.emit(Event.SENDMESSAGE, text);
    setText('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && text.trim()) {
      sendMessage(text);
    }
  };

  return (
    <Box>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
      />
      <Chatbox />
    </Box>
  );
}

export default Playground;
