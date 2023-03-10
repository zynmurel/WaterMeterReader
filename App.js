import { StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './components/Login';
import AntDesign from '@expo/vector-icons/AntDesign'
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react';
import Reading from './components/Reading';
import { useNavigation } from "@react-navigation/native";
import ConsumerPage from './components/ConsumerPage';
import CameraController from './components/HomeComponents/Camera/CameraController';
import ReadConsumers from './components/HomeComponents/ReadConsumers';

const Stack = createNativeStackNavigator();

export default function App() {
  const [readerDetails , setReaderDetails] = useState({user_id:'', user_email:''})
  const getReader =async()=> {
    const token = await AsyncStorage.getItem("user_token")
    const user_id = await AsyncStorage.getItem("user_id")
    const user_email = await AsyncStorage.getItem("user_email")
    setReaderDetails({user_id:user_id, user_email:user_email})
    console.log(token)
  }

  const [isLogin, setIsLogin] = useState(false)
  const [reloadHome, setReloadHome] = useState(true)
  useEffect(()=>{
    const getToken = async () => {
      const token = await AsyncStorage.getItem("user_token")
      console.log(token)
      if(token!==null){
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
      return token
    }
    getToken()
    getReader()
  },[isLogin])
  console.log(isLogin)
  return (
    <>
    <StatusBar style='light'/>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown:false }} >
            <Stack.Group>
              {!isLogin && <Stack.Screen name='Login'>
                {props => <Login {...props} setIsLogin={setIsLogin}/>}
              </Stack.Screen>}
              {isLogin && <>
              <Stack.Screen name='Home'>
                {props => <Home {...props} setIsLogin={setIsLogin} reloadHome={reloadHome} setReloadHome={setReloadHome} readerDetails={readerDetails}/>}
              </Stack.Screen>
              <Stack.Screen name='Reading'>
                {props => <Reading {...props} reloadHome={reloadHome} setReloadHome={setReloadHome} />}
              </Stack.Screen>
              <Stack.Screen name='ConsumerPage'>
                {props => <ConsumerPage {...props} reloadHome={reloadHome} setReloadHome={setReloadHome} />}
              </Stack.Screen>
              <Stack.Screen name='ReadConsumers'>
                {props => <ReadConsumers {...props} reloadHome={reloadHome} setReloadHome={setReloadHome} readerDetails={readerDetails}/>}
              </Stack.Screen>

              </>}
            </Stack.Group>
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
