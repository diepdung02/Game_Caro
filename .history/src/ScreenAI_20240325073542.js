import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const GameModeScreen = ({navigation}) => {
  const handleStartGame = (rows, cols) => {
    navigation.navigate('CaroGame', {rows, cols});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn chế độ chơi:</Text>
      <TouchableOpacity
        style={styles.button}
        title="Chơi 3x3"
        onPress={() => handleStartGame(3, 3)}
      />
      <TouchableOpacity
        style={styles.button}
        
        onPress={() => handleStartGame(5, 5)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  
});

export default GameModeScreen;
