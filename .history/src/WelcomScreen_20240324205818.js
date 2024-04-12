import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('./background_image.jpg')} // Đường dẫn của hình nền
      style={styles.background}>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Giữ tỷ lệ của hình nền
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Màu đen với độ trong suốt 0.5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: 'white', // Màu chữ trắng
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#0099FF',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
