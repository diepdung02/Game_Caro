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
  const [showModal, setShowModal] = useState(false);

  const checkWinner = () => {
    // Your existing checkWinner logic here...
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

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {renderBoard()}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {winner === 'Draw' ? 'Hòa' : `Người chiến thắng: ${winner}`}
            </Text>
            <Button title="Close" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
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

export default Game;
