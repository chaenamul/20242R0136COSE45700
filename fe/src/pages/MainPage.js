import React, { useState } from "react";
import { Event, socket } from "socket/socket";
import { Box, Button, TextField } from "@mui/material";
import Chatbox from "components/Chatbox";


function MainPage() {
  return (
    <Box>
      <Chatbox />
    </Box>
  );
}

export default MainPage;
