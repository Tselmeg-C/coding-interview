import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import CodeEditor from './components/CodeEditor';
import { mockRoomService } from './services/roomService';

function HomePage() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  async function createRoom() {
    setIsCreating(true);
    setError('');
    try {
      const room = await mockRoomService.createRoom();
      navigate('/room/' + room.id);
    } catch {
      setError('We could not create an interview room. Please try again.');
      setIsCreating(false);
    }
  }

  return (
    <main className="landing">
      <p className="eyebrow">PAIRCODE</p>
      <h1>Make the interview about the problem, not the setup.</h1>
      <p className="lede">Create a shared coding space and send one link to your candidate.</p>
      <button type="button" onClick={createRoom} disabled={isCreating}>
        {isCreating ? 'Creating room…' : 'Create interview room'}
      </button>
      {error && <p role="alert">{error}</p>}
    </main>
  );
}

function RoomPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState('connecting');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('Run code to see output here.');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    mockRoomService.getRoom(roomId)
      .then((loadedRoom) => {
        if (active) {
          setRoom(loadedRoom);
          setStatus('connected');
        }
      })
      .catch((roomError) => {
        if (active) {
          setError(roomError.message);
          setStatus('disconnected');
        }
      });
    return () => { active = false; };
  }, [roomId]);

  async function applyChange(patch) {
    try {
      setRoom(await mockRoomService.updateRoom(roomId, patch));
    } catch (roomError) {
      setError(roomError.message);
    }
  }

  async function changeLanguage(event) {
    const language = event.target.value;
    await applyChange({ language, code: mockRoomService.templateFor(language) });
    setOutput('Language changed. Run code to see output here.');
  }

  async function copyLink() {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
  }

  if (error) {
    return <main className="message"><h1>Room unavailable</h1><p>{error}</p><Link to="/">Create a new room</Link></main>;
  }
  if (!room) {
    return <main className="message"><p>Connecting to interview room…</p></main>;
  }

  return (
    <main className="room-shell">
      <header>
        <Link className="brand" to="/">PAIRCODE</Link>
        <span className={'status ' + status}>{status}</span>
      </header>
      <section className="room-toolbar" aria-label="Room controls">
        <div>
          <label htmlFor="language">Language</label>
          <select id="language" value={room.language} onChange={changeLanguage}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div className="share">
          <span>Share this room</span>
          <button type="button" className="secondary" onClick={copyLink}>{copied ? 'Copied' : 'Copy link'}</button>
        </div>
      </section>
      <section className="workspace">
        <div className="editor-panel">
          <h2>Shared editor</h2>
          <CodeEditor code={room.code} language={room.language} onChange={(code) => applyChange({ code })} />
        </div>
        <aside className="output-panel">
          <h2>Output</h2>
          <pre>{output}</pre>
          <button type="button" disabled title="Browser-only execution is added in a later phase">Run code</button>
        </aside>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path="*" element={<main className="message"><h1>Page not found</h1><Link to="/">Go home</Link></main>} />
    </Routes>
  );
}
