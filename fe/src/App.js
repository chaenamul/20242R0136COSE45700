import React, { useState, useEffect } from 'react';
import "App.css";
import { CssBaseline } from '@mui/material';
import { SocketProvider } from 'contexts/SocketContext';
import { BrowserRouter } from "react-router-dom";
import Router from "routes/Router";
import Header from "components/Header";

function App() {
  
  return (
    <div>
      <CssBaseline />
      <SocketProvider>
        <BrowserRouter>
          <Header />
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
