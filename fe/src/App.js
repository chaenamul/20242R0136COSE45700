import React, { useState, useEffect } from 'react';
import "App.css";
import { io } from 'socket.io-client';
import { CssBaseline } from '@mui/material';
import { SocketProvider } from 'contexts/SocketContext';
import { BrowserRouter } from "react-router-dom";
import Router from "routes/Router";
import Header from "components/Header";

// import { socket } from 'socket/socket';

function App() {
  const [namespace, setNamespace] = useState("/");
  const URL = process.env.REACT_APP_SOCKET_URL;

  useEffect(() => {
    const socket = io(URL);

    socket.on("joinedRoom", (roomName) => {
      setNamespace(`/${roomName}`);
      socket.disconnect();
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <CssBaseline />
      <SocketProvider namespace={namespace}>
        <BrowserRouter>
          {/* <Header isConnected={ isConnected } /> */}
          <Router />
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}

// function App() {
//   const [isConnected, setIsConnected] = useState(socket.connected);

//   useEffect(() => {
//     if (socket.connected) {
//       setIsConnected(true);
//     }

//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);

//     return () => {
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//     };
//   }, []);

//   return (
//     <div>
//       <CssBaseline />
//       <BrowserRouter>
//         <Header isConnected={ isConnected } />
//         <Router />
//       </BrowserRouter>
//     </div>
//   );
// }

export default App;
