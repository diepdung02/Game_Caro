const getBestMove = (currentBoard, currentPlayer, alpha, beta, depth) => {
  let bestScore = currentPlayer === PLAYER_X ? -Infinity : Infinity;
  let bestMoves = [];
  let opponent = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (currentBoard[i][j] === EMPTY) {
        currentBoard[i][j] = currentPlayer;
        let score = evaluateBoard(currentBoard);
        if (
          (currentPlayer === PLAYER_X && score > bestScore) ||
          (currentPlayer === PLAYER_O && score < bestScore)
        ) {
          bestScore = score;
          bestMoves = [[i, j]];
        } else if (score === bestScore) {
          bestMoves.push([i, j]);
        }
        currentBoard[i][j] = EMPTY;
        if (currentPlayer === PLAYER_X) {
          alpha = Math.max(alpha, score);
        } else {
          beta = Math.min(beta, score);
        }
        if (beta <= alpha) {
          break;
        }
      }
    }
  }

  if (bestScore === -10) { // Nếu đối thủ có cơ hội thắng
    let blockingMove = [];
    for (let move of bestMoves) {
      const [row, col] = move;
      currentBoard[row][col] = opponent;
      let score = evaluateBoard(currentBoard);
      if (score === 10) { // Nếu nước đi này chặn được đối thủ thắng
        blockingMove = move;
        break;
      }
      currentBoard[row][col] = EMPTY;
    }
    if (blockingMove.length > 0) {
      return blockingMove;
    }
  }

  const randomMove =
    bestMoves[Math.floor(Math.random() * bestMoves.length)];
  return randomMove;
};
