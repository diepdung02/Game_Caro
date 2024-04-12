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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    paddingTop: 20,
    fontSize: 20,
    color: 'white',
    textDecorationLine: 'none',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
