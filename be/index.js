import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
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

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`connected:    ${socket.id}`);
  
  socket.on('sendMessage', (text) => {
    console.log(text)
    console.log(`${socket.id}: ${text}`)
    socket.broadcast.emit('receiveMessage', `${socket.id}: ${text}`)
    socket.emit('receiveMessage', `Me: ${text}`)
  });

  socket.on('disconnect', () => {
    console.log(`disconnected: ${socket.id}`);
  });
});
