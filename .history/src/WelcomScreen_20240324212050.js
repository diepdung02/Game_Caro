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
    backgroundColor: '#00008B',
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
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '00FFFF',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
