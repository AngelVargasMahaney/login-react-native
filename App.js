import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './modules/LoginScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './modules/HomeScreen';
import RegisterScreen from './modules/RegisterScreen';
import { AuthProvider } from './modules/context/AuthContext';
import DetailScreen from './modules/DetailScreen';

const Stack = createNativeStackNavigator();
//cannot read  propierties  of undefinied (reading navigate)

function MyStack() {
  return (
    //Aqui por mientras alternas las plantallas de vista

    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>

      <Stack.Screen name="Login"
        component={LoginScreen} />
      <Stack.Screen name="Home"
        component={HomeScreen} />

      <Stack.Screen name="Register"
        component={RegisterScreen} />
      <Stack.Screen name="ReporteDetalle"
        component={DetailScreen} />

    </Stack.Navigator>


  )
}


export default function App() {

  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </AuthProvider>

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10px",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
