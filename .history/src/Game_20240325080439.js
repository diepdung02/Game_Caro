import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';

const ROWS = 3;
const COLS = 3;
const EMPTY = '-';
const PLAYER_X = 'X';
const PLAYER_O = 'O';

const Game = () => {
  const [board, setBoard] = useState(() => {
    const initialBoard = [];
    for (let i = 0; i < ROWS; i++) {
      initialBoard.push(Array(COLS).fill(EMPTY));
    }
    return initialBoard;
  });

  const [player, setPlayer] = useState(PLAYER_X);
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    // Check rows
    for (let i = 0; i < ROWS; i++) {
      if (
        board[i][0] !== EMPTY &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        setWinner(board[i][0]);
        return;
      }
    }

    // Check columns
    for (let j = 0; j < COLS; j++) {
      if (
        board[0][j] !== EMPTY &&
        board[0][j] === board[1][j] &&
        board[0][j] === board[2][j]
      ) {
        setWinner(board[0][j]);
        return;
      }
    }

    // Check diagonals
    if (
      board[0][0] !== EMPTY &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
      return;
    }
    if (
      board[0][2] !== EMPTY &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
      return;
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
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#FF9966',
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
});

export default Game;
