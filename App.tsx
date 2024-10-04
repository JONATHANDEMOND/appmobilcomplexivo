//rafc+tab
import 'react-native-gesture-handler';
import React from 'react'
import { PaperProvider } from 'react-native-paper'

import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './src/navigator/StackNavigator';
import { LoginScreen } from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const App = () => {
  return (
    <NavigationContainer>
    <PaperProvider>
    <StackNavigator/>
    </PaperProvider>
    </NavigationContainer>
  )
}

export default App

