import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});

const io = new Server(server, {
  cors: {
    origin: "*", // FIXME: 주소값넣기
    methods: ["GET", "POST"], 
  }
});

let userList = []
let users = {}

io.on('connection', (socket) => {
  console.log(`connected:    ${socket.id}`);
  userList.push({ id: socket.id, username: socket.id})
  users[id] = username
  io.emit('updateUserList', userList)
  console.log(`userList: `, userList)
  
  socket.on('sendMessage', (data) => {
    console.log(data)
    console.log(`${data.username}(${socket.id}): ${data.text}`)
    socket.broadcast.emit('receiveMessage', `${data.username}: ${data.text}`)
    socket.emit('receiveMessage', `Me: ${data.text}`)
  });

  socket.on('getUsername', () => {
    socket.emit('getUsername', )
  })

  socket.on('changeUsername', (string) => {
    socket.emit('changeUsername', string)
    userList = userList.map(user => {
      if (user.id === socket.id) {
        console.log('user to change: ', user)
        return { id: user.id, username: string };
      } else {
        return user;
      }
    });
    console.log(`userList: `, userList)
    io.emit('updateUserList', userList)
    socket.emit('receiveMessage', `Changed Nickname to ${string}`)
  })

  // socket.

  socket.on('disconnect', () => {
    userList = userList.filter(
      (user) => user.id !== socket.id
    );
    console.log(`disconnected: ${socket.id}`);
  });
});
