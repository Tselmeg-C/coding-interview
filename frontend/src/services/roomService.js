const STORAGE_KEY = 'paircode.mock.rooms';

const templates = {
  javascript: 'function solve(input) {\n  // Write your solution here.\n  return input;\n}\n\nconsole.log(solve("Hello, interview!"));\n',
  python: 'def solve(value):\n    # Write your solution here.\n    return value\n\nprint(solve("Hello, interview!"))\n',
};

function loadRooms() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function saveRooms(rooms) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
}

function newRoomId() {
  return crypto.randomUUID().slice(0, 8);
}

export const mockRoomService = {
  async createRoom() {
    const room = {
      id: newRoomId(),
      language: 'javascript',
      code: templates.javascript,
      updatedAt: new Date().toISOString(),
    };
    const rooms = loadRooms();
    rooms[room.id] = room;
    saveRooms(rooms);
    return room;
  },

  async getRoom(id) {
    const room = loadRooms()[id];
    if (!room) throw new Error('This interview room does not exist yet.');
    return room;
  },

  async updateRoom(id, patch) {
    const rooms = loadRooms();
    const existing = rooms[id];
    if (!existing) throw new Error('This interview room does not exist yet.');
    const room = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    rooms[id] = room;
    saveRooms(rooms);
    return room;
  },

  templateFor(language) {
    return templates[language];
  },
};
