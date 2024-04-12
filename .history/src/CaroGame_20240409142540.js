import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Modal,
} from 'react-native';

const ROWS = 3;
const COLS = 3;
const EMPTY = '-';
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const MAX_DEPTH = 3;

const CaroGame = ({navigation}) => {
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

  const evaluateMove = (currentBoard, currentPlayer, depth, alpha, beta, isMaximizing) => {
    const result = checkWinner(currentBoard, PLAYER_X);
    if (result !== null) {
      return result === PLAYER_X ? 10 - depth : result === PLAYER_O ? depth - 10 : 0;
    }
    if (!currentBoard.flat().includes(EMPTY) || depth === MAX_DEPTH) {
      return evaluateBoard(currentBoard);
    }
  
    let bestScore = isMaximizing ? -Infinity : Infinity;
    const isXPlayer = currentPlayer === PLAYER_X;
  
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (currentBoard[i][j] === EMPTY) {
          currentBoard[i][j] = currentPlayer;
          const score = evaluateMove(currentBoard, isXPlayer ? PLAYER_O : PLAYER_X, depth + 1, alpha, beta, !isMaximizing);
          currentBoard[i][j] = EMPTY;
          if ((isXPlayer && score > bestScore) || (!isXPlayer && score < bestScore)) {
            bestScore = score;
            if (isMaximizing) {
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
    }
    return bestScore;
  };
  
  const getBestMove = (currentBoard, currentPlayer, alpha, beta, depth) => {
    let bestScore = currentPlayer === PLAYER_X ? -Infinity : Infinity;
    let bestMoves = [];
  
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (currentBoard[i][j] === EMPTY) {
          currentBoard[i][j] = currentPlayer;
          const score = evaluateMove(currentBoard, currentPlayer, depth + 1, alpha, beta, false);
          if ((currentPlayer === PLAYER_X && score > bestScore) || (currentPlayer === PLAYER_O && score < bestScore)) {
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
    return evaluateMove(currentBoard, PLAYER_X, depth, alpha, beta, isMaximizing);
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
    width: 100,
    height: 100,
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

export default CaroGame;
