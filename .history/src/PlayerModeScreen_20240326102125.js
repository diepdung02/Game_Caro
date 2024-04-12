import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const GameModeScreen = ({navigation}) => {
  const handleStartGame3x3 = (rows, cols) => {
    navigation.navigate('Game', {rows, cols});
  };

  const handleStartGame5x5 = (rows, cols) => {
    navigation.navigate('Game5x5', {rows, cols});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn chế độ chơi:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleStartGame(3, 3)}>
        <Text>Chế độ 3X3</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleStartGame(5, 5)}>
        <Text>Chế độ 5X5</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE4E1',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#4169E1',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#5BD4D4',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameModeScreen;
