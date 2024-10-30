import React, { useState, useEffect } from 'react';
import "App.css";
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
import Header from "components/Header";
import Router from "routes/Router";
import { socket } from 'socket/socket';
import { ConnectionManager } from 'socket/ConnectionManager';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (socket.connected) {
      setIsConnected(true);
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <Header isConnected={ isConnected } />
        {/* <ConnectionManager isConnected={ isConnected } /> */}
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
