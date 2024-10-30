import React, { useState, useEffect } from "react";
import { Event, socket } from "socket/socket";
import { Box, Stack } from "@mui/material";

function Chatbox() {
  const [chats, setChats] = useState([]);

	useEffect(() => {
		function onReceiveMessage(text) {
      setChats(chats.concat(text));
		}
		socket.on(Event.RECEIVEMESSAGE, onReceiveMessage);
		return () => {
			socket.off(Event.RECEIVEMESSAGE, onReceiveMessage);
		}
	}, [chats])

  return (
    <Stack>
			{
				chats.map((chat, index) =>
						<Box key={ index }>{ chat }</Box>
				)
			}
    </Stack>
  );
}

export default Chatbox;
