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

io.on('connection', (socket) => {
  // send a message to the client
  socket.emit('hello from server', 1, '2', { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on('hello from client', (args) => {
    console.log('hello from client', args);
  });
});

app.listen(PORT, () => console.log(`App is live on port ${PORT}`));
