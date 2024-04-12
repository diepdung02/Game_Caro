import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen, CaroGame,Game, GameModeScreen, PlayerModeScreen } from '../src/main';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={none}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="CaroGame" component={CaroGame} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="GameModeScreen" component={GameModeScreen} />
        <Stack.Screen name="PlayerModeScreen" component={PlayerModeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
