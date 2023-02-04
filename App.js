import { StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './components/Login';
import AntDesign from '@expo/vector-icons/AntDesign'
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown:false }}>
            <Stack.Group>
              <Stack.Screen name='Login' component={Login}/>
              <Stack.Screen name='Home' component={Home} />
            </Stack.Group>
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
