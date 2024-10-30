import { io } from 'socket.io-client';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
// const URL = 'http://localhost:3001';
const dev = '0.8'
const URL = `http://192.168.${dev}:3001`;

export const socket = io(URL, {
  // autoConnect: false
});

export const Event = Object.freeze({
  SENDMESSAGE: "sendMessage",
  RECEIVEMESSAGE: "receiveMessage"
});