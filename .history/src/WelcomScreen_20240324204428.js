import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng đến với trò chơi Caro</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('GameModeScreen')}
        style={styles.button}>
        <Text style={styles.buttonText}>Chơi với máy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('PlayerModeScreen')}
        style={styles.button}>
        <Text style={styles.buttonText}>Chơi với người</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'none',
  },
});

export default WelcomeScreen;
