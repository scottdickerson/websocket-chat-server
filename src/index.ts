// import http from 'http';

import cors from 'cors';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
app.use(cors());
// const server = http.createServer(app);
const io = new Server(8081);
const PORT = 8080 || process.env.PORT;

// define a route handler for the default home page
// app.get('/', (_req, res) => {
//   res.send('Hello world!');
// });

app.get('/api', (_req, res) => {
  res.send({ data: 'My data' });
});

const typeTheResponse = (stringToSend: string) => {
  const intervalTimer = setInterval(() => {
    const nextChar = stringToSend[0];
    stringToSend = stringToSend.slice(1);
    io.emit('hello from server', nextChar);
    if (stringToSend.length === 0) {
      clearInterval(intervalTimer);
    }
  }, 100);
};

io.on('connection', (socket) => {
  // send a message to the client
  console.log('a user connected');
  typeTheResponse('Hello do you have a question?\n');
  // receive a message from the client
  socket.on('hello from client', (args) => {
    console.log('hello from client', args);
    typeTheResponse(`\nYou said\n${args}`);
  });
});

app.listen(PORT, () => console.log(`App is live on port ${PORT}`));
