// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SOCKET_URL;
const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

// export const SocketProvider = ({ namespace = "/", children }) => {
export const SocketProvider = ({ children }) => {
  const [namespace, setNamespace] = useState("/");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.disconnect();
    }
    // 새로운 네임스페이스 소켓 생성
    const newSocket = io(`${URL}${namespace}`);
    setSocket(newSocket);

    // 네임스페이스가 변경될 때 이전 소켓 해제
    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namespace]);

  // Listen for username update
  useEffect(() => {
    if (!socket) return;

    // Listen for initial username from server
    socket.on('change_namespace', (game) => {
      socket.disconnect();
      setNamespace(`${game}`)
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('change_namespace');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
