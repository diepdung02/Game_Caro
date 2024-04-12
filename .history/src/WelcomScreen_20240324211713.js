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
    backgroundColor: '	rgb(168,168,168,0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40, // Tăng khoảng cách với các button
    textAlign: 'center', // Căn giữa tiêu đề
    color: '#AFEEEE',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#00FF7F',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#20B2AA',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
