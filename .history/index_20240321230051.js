/**
 * @format
 */

import {AppRegistry} from 'react-native';
import CaroGame from './src/CaroGame';
import WelcomeScreen from './src/WelcomScreen';
import AuthNavigator from './navigator/AuthNavigator';

AppRegistry.registerComponent('Game', () => AuthNavigator);
