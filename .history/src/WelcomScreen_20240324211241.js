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
    backgroundColor: '#00BFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40, // Tăng khoảng cách với các button
    textAlign: 'center', // Căn giữa tiêu đề
    color: '#00FFFF',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#0099FF',
    borderRadius: 25, // Bo tròn góc
    marginBottom: 20, // Tăng khoảng cách giữa các button
    justifyContent: 'center', // Căn giữa button theo chiều dọc
    alignItems: 'center', // Căn giữa button theo chiều ngang
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
