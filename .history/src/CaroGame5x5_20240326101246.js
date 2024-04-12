import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Modal,
} from 'react-native';

const ROWS = 5;
const COLS = 5;
const EMPTY = '-';
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const MAX_DEPTH = 5;

const CaroGame5x5 = ({navigation}) => {
  const initialBoard = () => {
    const board = [];
    for (let i = 0; i < ROWS; i++) {
      board.push(Array(COLS).fill(EMPTY));
    }
    return board;
  };

  const [board, setBoard] = useState(initialBoard());
  const [player, setPlayer] = useState(PLAYER_X);
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (player === PLAYER_O && !winner) {
      setTimeout(() => {
        makeAiMove();
      }, 1000);
    }
  }, [player]);

  const makeAiMove = () => {
    const bestMove = getBestMove(board, PLAYER_O, -Infinity, Infinity, 0);
    if (bestMove) {
      const [row, col] = bestMove;
      const newBoard = [...board];
      newBoard[row][col] = PLAYER_O;
      setBoard(newBoard);
      setPlayer(PLAYER_X);
      checkWinner(newBoard, PLAYER_O);
    }
  };

  const getBestMove = (currentBoard, currentPlayer, alpha, beta, depth) => {
    let bestScore = currentPlayer === PLAYER_X ? -Infinity : Infinity;
    let bestMoves = [];

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (currentBoard[i][j] === EMPTY) {
          currentBoard[i][j] = currentPlayer;
          let score = minimax(currentBoard, depth + 1, alpha, beta, false);
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

    const randomMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    return randomMove;
  };

  const minimax = (currentBoard, depth, alpha, beta, isMaximizing) => {
    const result = checkWinner(currentBoard, PLAYER_X);
    if (result !== null) {
      return result === PLAYER_X
        ? 10 - depth
        : result === PLAYER_O
        ? depth - 10
        : 0;
    }

    if (!currentBoard.flat().includes(EMPTY) || depth === MAX_DEPTH) {
      return evaluateBoard(currentBoard);
    }

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (currentBoard[i][j] === EMPTY) {
            currentBoard[i][j] = PLAYER_X;
            const score = minimax(currentBoard, depth + 1, alpha, beta, false);
            currentBoard[i][j] = EMPTY;
            maxScore = Math.max(score, maxScore);
            alpha = Math.max(alpha, score);
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
      return maxScore;
    } else {
      let minScore = Infinity;
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (currentBoard[i][j] === EMPTY) {
            currentBoard[i][j] = PLAYER_O;
            const score = minimax(currentBoard, depth + 1, alpha, beta, true);
            currentBoard[i][j] = EMPTY;
            minScore = Math.min(score, minScore);
            beta = Math.min(beta, score);
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
      return minScore;
    }
  };
  const evaluateBoard = currentBoard => {
    let score = 0;
    const winningPatterns = [
      // Các dãy có thể tạo ra chiến thắng
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ], // Hàng 1
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ], // Hàng 2
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ], // Hàng 3
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ], // Cột 1
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ], // Cột 2
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ], // Cột 3
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ], // Đường chéo chính
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ], // Đường chéo phụ
    ];

    // Đánh giá từng dãy có thể tạo ra chiến thắng
    winningPatterns.forEach(pattern => {
      const [p1, p2, p3] = pattern;
      const value1 = currentBoard[p1[0]][p1[1]];
      const value2 = currentBoard[p2[0]][p2[1]];
      const value3 = currentBoard[p3[0]][p3[1]];

      // Đánh giá các dãy đã bắt đầu được xây dựng
      if (value1 === value2 || value2 === value3 || value1 === value3) {
        if (value1 === PLAYER_X || value2 === PLAYER_X || value3 === PLAYER_X) {
          score += 10;
        } else if (
          value1 === PLAYER_O ||
          value2 === PLAYER_O ||
          value3 === PLAYER_O
        ) {
          score -= 10;
        }
      }

      // Tránh các dãy bị chặn
      if (
        (value1 === PLAYER_X && value2 === PLAYER_O && value3 === EMPTY) ||
        (value1 === PLAYER_O && value2 === PLAYER_X && value3 === EMPTY)
      ) {
        score -= 1;
      }
    });

    return score;
  };

  const handleClick = (row, col) => {
    if (!winner && board[row][col] === EMPTY) {
      const newBoard = [...board];
      newBoard[row][col] = player;
      setBoard(newBoard);
      setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
      checkWinner(newBoard, player);
    }
  };

  const checkWinner = (currentBoard, currentPlayer) => {
    for (let i = 0; i < ROWS; i++) {
      // Kiểm tra hàng
      if (
        currentBoard[i][0] === currentPlayer &&
        currentBoard[i][1] === currentPlayer &&
        currentBoard[i][2] === currentPlayer
      ) {
        setWinner(currentPlayer);
        return;
      }
      // Kiểm tra cột
      if (
        currentBoard[0][i] === currentPlayer &&
        currentBoard[1][i] === currentPlayer &&
        currentBoard[2][i] === currentPlayer
      ) {
        setWinner(currentPlayer);
        return;
      }
    }
    // Kiểm tra đường chéo
    if (
      currentBoard[0][0] === currentPlayer &&
      currentBoard[1][1] === currentPlayer &&
      currentBoard[2][2] === currentPlayer
    ) {
      setWinner(currentPlayer);
      return;
    }
    if (
      currentBoard[0][2] === currentPlayer &&
      currentBoard[1][1] === currentPlayer &&
      currentBoard[2][0] === currentPlayer
    ) {
      setWinner(currentPlayer);
      return;
    }
    // Kiểm tra nếu hết ô trống
    if (!currentBoard.flat().includes(EMPTY)) {
      setWinner('Draw');
      return;
    }
  };

  const handleRestart = () => {
    setBoard(initialBoard());
    setPlayer(PLAYER_X);
    setWinner(null);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((cell, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[
              styles.cell,
              {
                Color:
                  cell === PLAYER_X
                    ? 'green'
                    : cell === PLAYER_O
                    ? 'blue'
                    : 'white',
              },
            ]}
            onPress={() => handleClick(rowIndex, colIndex)}>
            <Text
              style={[
                styles.cellText,
                {color: cell === PLAYER_X ? 'red' : 'blue'},
              ]}>
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        {winner
          ? winner === 'Draw'
            ? 'Draw'
            : `Chiến Thắng: ${winner}`
          : `Người Chơi: ${player}`}
      </Text>
      {renderBoard()}
      {winner && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            setShowModal(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {winner === 'Draw' ? 'Draw!' : `Người Chơi  ${winner} Thắng!`}
              </Text>
              <Button title="Chơi Lại" onPress={handleRestart} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA07A',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#FFFF33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 20,
    color: 'red',
  },
  infoText: {
    marginBottom: 10,
    fontSize: 30,
    color: '#1E8A39',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CaroGame5x5;
