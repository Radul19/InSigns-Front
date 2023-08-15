// In App.js in a new project
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
import Context from './src/components/Context';
import { useState } from 'react';
import CodePage from './src/pages/CodePage';
import Game5 from './src/pages/Games/Game5';
import Game6 from './src/pages/Games/Game6';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
  // const [userData, setUserData] = useState({
  //   "_id": "64c21cd8eec13b55ec6bd2d3",
  //   "name": "Prueba_1_name",
  //   "email": "wtf@gmail.com",
  //   "username": "usprueba",
  //   "genre": 1,
  //   "birthdate": "13/3/2003",
  //   "__v": 0,
  //   "avatar": 2,
  //   "class0": [
  //       3,
  //       2
  //   ],
  //   "class1": [],
  //   "class2": []
  // })
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    username: "",
    genre: 0,
    birthdate: "",
    avatar: 0,
    class0: [],
    class1: [],
    class2: [],
  })

  const [lvlData, setLvlData] = useState({
    levels: [], pos: 0, stars: 3, loc: 0
  })





  if (!fontsLoaded) {
    return null;
  }



  return (
    <Context.Provider value={{ userData, setUserData, lvlData, setLvlData }} >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="CodePage" component={CodePage} />
          <Stack.Screen name="Home" component={Home2} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Levels" component={Levels} />
          <Stack.Screen name="Game1" component={Game1} />
          <Stack.Screen name="Game2" component={Game2} />
          <Stack.Screen name="Game3" component={Game3} />
          <Stack.Screen name="Game4" component={Game4} />
          <Stack.Screen name="Game5" component={Game5} />
          <Stack.Screen name="Game6" component={Game6} />
          {/* <Stack.Screen name="Test2" component={Test2} />  */}
          {/* <Stack.Screen name="Test" component={Test} />  */}
          {/* <Stack.Screen name="Home" component={Home} />  */}
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
