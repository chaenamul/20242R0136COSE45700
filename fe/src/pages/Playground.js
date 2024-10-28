import React, { useState } from "react";
import { Event, socket } from "socket/socket";
import { Box, TextField } from "@mui/material";


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
      Hello
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
      />
    </Box>
  );
}

export default Playground;
