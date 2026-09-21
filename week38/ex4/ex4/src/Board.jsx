import { useState } from 'react';
import Square from './Square.jsx';

const BOARD_SIZE = 8;

// Builds the initial 8x8 pattern of booleans (true = light square).
// The upper-left square is light, and colors alternate from there.
function createInitialSquares() {
  const squares = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      squares.push((row + col) % 2 === 0);
    }
  }
  return squares;
}

function Board() {
  const [squares, setSquares] = useState(createInitialSquares);

  function handleSquareClick(index) {
    setSquares((prevSquares) => {
      const nextSquares = prevSquares.slice();
      nextSquares[index] = !nextSquares[index];
      return nextSquares;
    });
  }

  return (
    <div className="board">
      {squares.map((isLight, index) => (
        <Square
          key={index}
          isLight={isLight}
          onSquareClick={() => handleSquareClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;
