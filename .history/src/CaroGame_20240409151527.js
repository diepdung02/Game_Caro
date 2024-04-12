import React, { useState, useEffect } from 'react';
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

const CaroGame = ({ navigation }) => {
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
    let opponent = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  
    // Tìm tất cả các nước đi có thể chiến thắng và lưu vào mảng bestMoves
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (currentBoard[i][j] === EMPTY) {
          currentBoard[i][j] = currentPlayer;
          if (checkWinner(currentBoard, currentPlayer)) {
            bestMoves.push([i, j]);
          }
          currentBoard[i][j] = EMPTY;
        }
      }
    }
  
    // Nếu không có nước đi nào có thể chiến thắng, tiếp tục tìm nước đi có thể chặn đối thủ
    if (bestMoves.length === 0) {
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (currentBoard[i][j] === EMPTY) {
            currentBoard[i][j] = opponent;
            if (checkWinner(currentBoard, opponent)) {
              bestMoves.push([i, j]);
            }
            currentBoard[i][j] = EMPTY;
          }
        }
      }
    }
  
    // Nếu không có nước đi nào có thể chiến thắng hoặc chặn đối thủ, thực hiện tìm nước đi tốt nhất cho chính người chơi
    if (bestMoves.length === 0) {
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
    }
  
    // Chọn một trong các nước đi tốt nhất ngẫu nhiên nếu không tìm thấy nước đi có thể chiến thắng, chặn đối thủ hoặc nước đi tốt nhất cho chính người chơi
    const randomMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    return randomMove;
  };
  
  
  const evaluateBoard = (currentBoard) => {
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
    winningPatterns.forEach((pattern) => {
      const [p1, p2, p3] = pattern;
      const value1 = currentBoard[p1[0]][p1[1]];
      const value2 = currentBoard[p2[0]][p2[1]];
      const value3 = currentBoard[p3[0]][p3[1]];
  
      // Đánh giá các dãy đã bắt đầu được xây dựng
      if (value1 === value2 || value2 === value3 || value1 === value3) {
        if (
          value1 === PLAYER_X ||
          value2 === PLAYER_X ||
          value3 === PLAYER_X
        ) {
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
        (value1 === PLAYER_X &&
          value2 === PLAYER_O &&
          value3 === EMPTY) ||
        (value1 === PLAYER_O &&
          value2 === PLAYER_X &&
          value3 === EMPTY)
      ) {
        score -= 1;
      }
  
      // Kiểm tra nếu có dãy có thể tạo ra chiến thắng
      if (value1 === EMPTY || value2 === EMPTY || value3 === EMPTY) {
        if (
          (value1 === PLAYER_X && value2 === PLAYER_X) ||
          (value2 === PLAYER_X && value3 === PLAYER_X) ||
          (value1 === PLAYER_X && value3 === PLAYER_X)
        ) {
          score += 50; // Nước đi có thể thắng cho người chơi X
        } else if (
          (value1 === PLAYER_O && value2 === PLAYER_O) ||
          (value2 === PLAYER_O && value3 === PLAYER_O) ||
          (value1 === PLAYER_O && value3 === PLAYER_O)
        ) {
          score -= 50; // Nước đi có thể thắng cho người chơi O và chặn đối thủ
        }
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
                { color: cell === PLAYER_X ? 'red' : 'blue' },
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
            ? 'Hòa'
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
                {winner === 'Draw'
                  ? 'Hòa!'
                  : `Người Chơi  ${winner} Thắng!`}
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
