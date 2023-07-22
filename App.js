// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Test from './src/pages/Test';
import Login from './src/pages/Login';
import Test2 from './src/pages/Test2';
import Game1 from './src/pages/Games/Game1';
import Game2 from './src/pages/Games/Game2';
import Game3 from './src/pages/Games/Game3';
import Game4 from './src/pages/Games/Game4';
import Home2 from './src/pages/Home2';
import Levels from './src/pages/Levels';
import Register from './src/pages/Register';
import Profile from './src/pages/Profile';
import Info from './src/pages/Info';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });


  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home2} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Levels" component={Levels} />
        <Stack.Screen name="Game1" component={Game1} />
        <Stack.Screen name="Game2" component={Game2} />
        <Stack.Screen name="Game3" component={Game3} />
        <Stack.Screen name="Game4" component={Game4} />
        {/* <Stack.Screen name="Test2" component={Test2} />  */}
        {/* <Stack.Screen name="Test" component={Test} />  */}
        {/* <Stack.Screen name="Home" component={Home} />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
