import React, { useState, useEffect } from 'react';
import "App.css";
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from "react-router-dom";
// import Header from "components/Header";
import Router from "routes/Router";
import { socket } from 'socket/socket';
import { ConnectionManager } from 'socket/ConnectionManager';
import { Events } from "socket/Events";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div>
      <CssBaseline />
      <BrowserRouter>
        <Events events={ fooEvents } />
        <ConnectionManager isConnected={ isConnected } />
        {/* <Header /> */}
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
