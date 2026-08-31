import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { attachRealtimeHandlers } from './realtime.js';
import { RoomStore } from './store/roomStore.js';

const port = Number(process.env.PORT ?? 3001);
const store = new RoomStore();
const sourceDirectory = dirname(fileURLToPath(import.meta.url));
const frontendDirectory = resolve(sourceDirectory, '../../frontend/dist');
const app = createApp(store, { frontendDirectory });
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  },
});

attachRealtimeHandlers(io, store);

server.listen(port, () => {
  console.log('PairCode backend listening on port ' + port);
});
