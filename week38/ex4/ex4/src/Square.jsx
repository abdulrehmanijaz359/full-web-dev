function Square({ isLight, onSquareClick }) {
  const squareClass = isLight ? 'square square-light' : 'square square-dark';

  return (
    <div className={squareClass} onClick={onSquareClick} />
  );
}

export default Square;
