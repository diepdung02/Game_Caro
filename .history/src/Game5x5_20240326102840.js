import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';

const ROWS = 5;
const COLS = 5;
const EMPTY = '-';
const PLAYER_X = 'X';
const PLAYER_O = 'O';

const Game5x5 = () => {
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

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j <= COLS - 4; j++) {
        if (
          board[i][j] !== EMPTY &&
          board[i][j] === board[i][j + 1] &&
          board[i][j] === board[i][j + 2] &&
          board[i][j] === board[i][j + 3]
        ) {
          setWinner(board[i][j]);
          return;
        }
      }
    }

    // Check columns
    for (let j = 0; j < COLS; j++) {
      for (let i = 0; i <= ROWS - 4; i++) {
        if (
          board[i][j] !== EMPTY &&
          board[i][j] === board[i + 1][j] &&
          board[i][j] === board[i + 2][j] &&
          board[i][j] === board[i + 3][j]
        ) {
          setWinner(board[i][j]);
          return;
        }
      }
    }

    // Check diagonals
    for (let i = 0; i <= ROWS - 4; i++) {
      for (let j = 0; j <= COLS - 4; j++) {
        if (
          board[i][j] !== EMPTY &&
          board[i][j] === board[i + 1][j + 1] &&
          board[i][j] === board[i + 2][j + 2] &&
          board[i][j] === board[i + 3][j + 3]
        ) {
          setWinner(board[i][j]);
          return;
        }
      }
    }

    for (let i = 0; i <= ROWS - 4; i++) {
      for (let j = COLS - 1; j >= 3; j--) {
        if (
          board[i][j] !== EMPTY &&
          board[i][j] === board[i + 1][j - 1] &&
          board[i][j] === board[i + 2][j - 2] &&
          board[i][j] === board[i + 3][j - 3]
        ) {
          setWinner(board[i][j]);
          return;
        }
      }
    }

    // Check draw
    if (!board.flat().includes(EMPTY)) {
      setWinner('Draw');
    }
  };

  const handlePress = (row, col) => {
    if (board[row][col] === EMPTY && !winner) {
      const newBoard = [...board];
      newBoard[row][col] = player;
      setBoard(newBoard);
      setPlayer(player === PLAYER_X ? PLAYER_O : PLAYER_X);
      checkWinner();
    }
  };

  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={styles.cell}
        onPress={() => handlePress(row, col)}>
        <Text
          style={[
            styles.cellText,
            cellValue === PLAYER_O ? {color: 'red'} : null,
          ]}>
          {cellValue}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleRestart = () => {
    setBoard(initialBoard());
    setPlayer(PLAYER_X);
    setWinner(null);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
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
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 40,
    color: 'blue',
  },
  winnerText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
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
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  infoText: {
    marginBottom: 10,
    fontSize: 30,
    color: '#1E8A39',
  },
});

export default Game5x5;
