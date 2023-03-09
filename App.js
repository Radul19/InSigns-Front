// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Home from './src/pages/Home';
import Test from './src/pages/Test';
import Login from './src/pages/Login';
import Test2 from './src/pages/Test2';
import Game1 from './src/pages/Game1';
import Home2 from './src/pages/Home2';

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
        <Stack.Screen name="Home2" component={Home2} /> 
        <Stack.Screen name="Game1" component={Game1} /> 
        {/* <Stack.Screen name="Test2" component={Test2} />  */}
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Test" component={Test} /> 
        <Stack.Screen name="Home" component={Home} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
