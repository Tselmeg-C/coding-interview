import { randomUUID } from 'node:crypto';

const templates = {
  javascript: 'function solve(input) {\n  // Write your solution here.\n  return input;\n}\n\nconsole.log(solve("Hello, interview!"));\n',
  python: 'def solve(value):\n    # Write your solution here.\n    return value\n\nprint(solve("Hello, interview!"))\n',
};

function timestamp() {
  return new Date().toISOString();
}

function roomId() {
  return randomUUID().slice(0, 8);
}

export class RoomStore {
  #rooms = new Map();

  create() {
    const room = {
      id: roomId(),
      language: 'javascript',
      code: templates.javascript,
      updatedAt: timestamp(),
    };
    this.#rooms.set(room.id, room);
    return room;
  }

  get(id) {
    return this.#rooms.get(id) ?? null;
  }

  update(id, patch) {
    const room = this.get(id);
    if (!room) return null;
    const updated = { ...room, ...patch, updatedAt: timestamp() };
    this.#rooms.set(id, updated);
    return updated;
  }
}

export function isRoomUpdate(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  if (keys.length === 0 || keys.some((key) => key !== 'code' && key !== 'language')) return false;
  if ('code' in value && typeof value.code !== 'string') return false;
  if ('language' in value && value.language !== 'javascript' && value.language !== 'python') return false;
  return true;
}
