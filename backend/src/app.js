import cors from 'cors';
import express from 'express';
import { isRoomUpdate } from './store/roomStore.js';

function errorResponse(error, message) {
  return { error, message };
}

export function createApp(store) {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '256kb' }));

  app.get('/health', (_request, response) => {
    response.status(200).json({ status: 'ok' });
  });

  app.post('/rooms', (_request, response) => {
    response.status(201).json(store.create());
  });

  app.get('/rooms/:roomId', (request, response) => {
    const room = store.get(request.params.roomId);
    if (!room) {
      response.status(404).json(errorResponse('room_not_found', 'This interview room does not exist.'));
      return;
    }
    response.status(200).json(room);
  });

  app.patch('/rooms/:roomId', (request, response) => {
    if (!isRoomUpdate(request.body)) {
      response.status(400).json(errorResponse('validation_error', 'Provide at least one supported room field.'));
      return;
    }
    const room = store.update(request.params.roomId, request.body);
    if (!room) {
      response.status(404).json(errorResponse('room_not_found', 'This interview room does not exist.'));
      return;
    }
    response.status(200).json(room);
  });

  app.use((_request, response) => {
    response.status(404).json(errorResponse('not_found', 'The requested endpoint does not exist.'));
  });

  return app;
}
