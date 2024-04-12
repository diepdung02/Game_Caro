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
    <View style={styles.container}>
      <ImageBackground
        source={require('../Images/caro.png')} // Đường dẫn của hình nền
        style={styles.background}></ImageBackground>
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
  background: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
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
    color: '#FFD700',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#CD5C5C',
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#8B0000',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
