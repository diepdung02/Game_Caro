import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GameModeScreen = ({ navigation }) => {
  const handleStartGame = (rows, cols) => {
    navigation.navigate('CaroGame', { rows, cols });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn chế độ chơi:</Text>
      <Button style={styles.btn3x3}
        title="Chơi 3x3"
        onPress={() => handleStartGame(3, 3)}
      />
      <Button style={styles.btn5x5}
        title="Chơi 5x5"
        onPress={() => handleStartGame(5, 5)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  btn3x3:{

  }
});

export default GameModeScreen;
