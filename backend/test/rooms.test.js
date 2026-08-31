import assert from 'node:assert/strict';
import test from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { RoomStore } from '../src/store/roomStore.js';

function createTestApp() {
  return createApp(new RoomStore());
}

test('creates and retrieves an interview room', async () => {
  const app = createTestApp();
  const created = await request(app).post('/api/rooms').expect(201);

  assert.match(created.body.id, /^[a-f0-9]{8}$/);
  assert.equal(created.body.language, 'javascript');
  assert.match(created.body.code, /console\.log/);

  const loaded = await request(app).get('/api/rooms/' + created.body.id).expect(200);
  assert.deepEqual(loaded.body, created.body);
});

test('updates code and language for an existing room', async () => {
  const app = createTestApp();
  const created = await request(app).post('/api/rooms').expect(201);

  const updated = await request(app)
    .patch('/api/rooms/' + created.body.id)
    .send({ language: 'python', code: 'print("hello")' })
    .expect(200);

  assert.equal(updated.body.language, 'python');
  assert.equal(updated.body.code, 'print("hello")');
  assert.notEqual(updated.body.updatedAt, '');
});

test('returns contract errors for missing rooms and invalid updates', async () => {
  const app = createTestApp();

  const missing = await request(app).get('/api/rooms/missing').expect(404);
  assert.deepEqual(missing.body, {
    error: 'room_not_found',
    message: 'This interview room does not exist.',
  });

  const created = await request(app).post('/api/rooms').expect(201);
  const invalid = await request(app)
    .patch('/api/rooms/' + created.body.id)
    .send({ language: 'ruby' })
    .expect(400);
  assert.equal(invalid.body.error, 'validation_error');
});
