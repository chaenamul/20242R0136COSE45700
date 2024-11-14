import React, { useState, useEffect } from "react";
import { useSocket } from 'contexts/SocketContext';
import { Box, Button, TextField } from "@mui/material";
import Chatbox from "components/Chatbox";


function Playground() {

  return (
    <Box>
      <Box sx={{ width: "50%", pl: 2}}>
        <Chatbox />
      </Box>
    </Box>
  );
}

export default Playground;
