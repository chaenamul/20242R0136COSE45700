import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "*", // FIXME: 주소값넣기
    methods: ["GET", "POST"], 
  }
});

// Object to store user information, mapping socket ID to username
const userList = {};

// TODO: add database
const userDataList = {
  alice: {
    health: 100
    // health: {
    //   head: 100,
    //   thorax: 100,
    //   stomach: 100,
    //   leftArm: 100,
    //   rightArm: 100,
    //   leftLeg: 100,
    //   rightLeg: 100
    // },
    // inventory: {
    //   equipments: {
    //     first: {},
    //     second: {},
    //     armor: {}
    //   },
    //   rig: [],
    //   backpack: []
    // }
  },
  daisy: {
    health: 100
  }
}
const maxPlayer = 2
const gameList = {}; // 게임 방 목록

// Function to generate a random username
function generateRandomUsername() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let username = 'user_';
  for (let i = 0; i < 6; i++) {
    username += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return username;
}

function assignRoom() {
  return 'room1';
}

// Handle new Socket.IO connections
io.on('connection', (socket) => {

  const username = generateRandomUsername();
  const room = assignRoom();
  userList[socket.id] = username;
  socket.join(room);
  socket.emit('set_username', { username: username });
  // console.log(`${username} | ${socket.id} connected (${socket.nsp.name})`);
  console.log('userList: ', userList)

  // Handle username change
  socket.on('change_username', (newUsername) => {
    userList[socket.id] = newUsername;
    socket.emit('set_username', { username: newUsername });
  });

  // Handle incoming messages
  socket.on('send_message', (message) => {
    const username = userList[socket.id];
    const rooms = Array.from(socket.rooms);
    const userRoom = rooms.find((r) => r !== socket.id);

    if (userRoom) {
      // Broadcast the message to everyone in the room except the sender
      socket.to(userRoom).emit('receive_message', { text: message, sender: username });
      socket.emit('receive_message', { text: message, sender: 'You' });
    }
  });
  
  socket.on('join_lobby', () => {
    socket.emit('change_namespace', '/lobby');
    console.log('user joined lobby');
  });

  socket.on('debug', (data) => {
    io.of(data.game).emit('receive_message', { text: data.game, sender: 'Server' });
    console.log('userDataList: ', userDataList)
    console.log('gameList: ', gameList)
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = userList[socket.id];
    delete userList[socket.id];
    console.log(`${username} disconnected`);
    console.log('userList: ', userList)
  });
});


// 빈 방 찾기 및 생성 함수
function findOrCreateGame() {
  for (const game in gameList) {
    if (gameList[game].players.length < maxPlayer) {
      return game;
    }
  }
  const newGame = `/game${Object.keys(gameList).length + 1}`;
  gameList[newGame] = {
    gameStatus: "new",
    players: [],
  };
  return newGame;
}

const lobby = io.of('/lobby');

lobby.on('connection', (socket) => {

  socket.on('register_username', (data) => {
    if (!(data.username in userDataList)) {
      userDataList[data.username] = { health: 100 } // initialize user object
    }
    socket.emit('check_online', {
      isOnline: true,
      userData: userDataList[data.username]
    });
  })

  // Handle namespace assignment
  socket.on('join_game', () => {
    const game = findOrCreateGame();
    gameList[game].push(socket.id);
    socket.emit('change_namespace', game);
    console.log(`${game} user list: `, gameList[game])
  });

  socket.on('leave_game', () => {
    const game = socket.nsp.name;
    gameList[game] = gameList[game].filter(id => id !== socket.id);
    if (gameList[game].length === 0) {
      delete gameList[game]; // 빈 방 삭제
    }
  });

  socket.on('disconnect', () => {
    // console.log(`${username} disconnected`);
  });
})

const parentNamespace = io.of(/^\/game\d+$/);

parentNamespace.on('connection', (socket) => {
  console.log(`${socket.id} connected (${socket.nsp.name})`);
});