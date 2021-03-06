
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import InfoPersona from './Screens/InfoPersona';
import InicioPersona from './Screens/InicioPersona';
import Login from './Screens/Login'
import Register from './Screens/Register'
import NuevoReporte from './Screens/NuevoReporte'
import MainBotBar,{InfoBotBar} from './Components/BotBar';


const Stack = createStackNavigator()
export default function App(){
    return (
      <NavigationContainer >   
        <Stack.Navigator>
          <Stack.Screen name='Login' component = {Login} options={{headerShown:false}} />
          <Stack.Screen name='Register' component = {Register} options={{headerShown:false}} />
          <Stack.Screen name='InicioPersona' component = {MainBotBar} options={{headerShown:false}}/>
          <Stack.Screen name='InfoPersona' component = {InfoBotBar} options={{headerShown:false}}/>
          {console.log('cargo')}
        </Stack.Navigator>
        
      </NavigationContainer>
    )
}

