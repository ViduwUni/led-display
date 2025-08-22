import React, { useEffect, useState } from 'react';
import LEDMatrix from './components/LEDMatrix';
import { font5x7 } from './font';
import { Rnd } from 'react-rnd';
import './App.css';

const ROWS = 7;
const BASE_COLS = 32;

const getCharMatrix = (char) => {
  return font5x7[char.toUpperCase()] || font5x7[' '];
};

const messageToMatrix = (text) => {
  const buffer = [];

  for (let row = 0; row < ROWS; row++) {
    const line = [];
    for (const char of text) {
      const charMat = getCharMatrix(char);
      line.push(...charMat[row], 0); // space between chars
    }
    buffer.push(line);
  }

  return buffer;
};

const App = () => {
  const [message, setMessage] = useState('HELLO SRI LANKA ❤️');
  const [cols, setCols] = useState(BASE_COLS);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [matrix, setMatrix] = useState(Array.from({ length: ROWS }, () => Array(BASE_COLS).fill(0)));

  useEffect(() => {
    const fullMessage = message + '   '; // add spacing at end
    const buffer = messageToMatrix(fullMessage);

    const interval = setInterval(() => {
      const newMatrix = buffer.map((row) => {
        const total = row.length;
        const start = scrollIndex % total;
        return [
          ...row.slice(start, start + cols),
          ...row.slice(0, Math.max(0, cols - (total - start)))
        ].slice(0, cols); // ensure it fits cols
      });

      setMatrix(newMatrix);
      setScrollIndex((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [scrollIndex, message, cols]);

  return (
    <div className="app-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something to scroll"
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 10,
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />

      <Rnd
        default={{
          x: 100,
          y: 100,
          width: 400,
          height: 100,
        }}
        minWidth={150}
        minHeight={70}
        bounds="parent"
        onResize={(e, direction, ref) => {
          const newCols = Math.floor(ref.offsetWidth / 12);
          setCols(newCols);
        }}
        dragHandleClassName="handle"
        style={{
          background: '#111',
          borderRadius: '10px',
          padding: '5px',
          boxShadow: '0 0 10px #f00',
        }}
      >
        <div className="handle" style={{ cursor: 'move', marginBottom: '5px' }}>
          <h4 style={{ color: 'white', margin: 0 }}>🟢 LED Display</h4>
        </div>
        <LEDMatrix matrix={matrix} />
      </Rnd>
    </div>
  );
};

export default App;