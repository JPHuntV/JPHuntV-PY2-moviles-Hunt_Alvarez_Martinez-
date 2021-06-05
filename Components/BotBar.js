import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text,TouchableOpacity, View, Image, Button } from 'react-native';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import NuevoReporte from '../Screens/NuevoReporte';
import Login from '../Screens/Login';
import InfoPersona from '../Screens/InfoPersona';
import InicioPersona from '../Screens/InicioPersona';
import Notificaciones from '../Screens/Notificaciones';
const Tab = createBottomTabNavigator()

const MainBotBar = (props) =>{

    var idcuentaCiudadano = props.route.params['idcuentaCiudadano']
    console.log('--->MainBotBar():', idcuentaCiudadano)
    return(
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'InicioPersona') {
                    iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'NuevoReporte') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                }else if (route.name === 'Notificaciones') {
                    iconName = focused ? 'md-notifications' : 'md-notifications-outline';
                }else if (route.name === 'InfoPersona') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                
                activeTintColor: 'tomato',
                inactiveTintColor: 'white',
                style:{
                    backgroundColor:'#4ecdc4',
                    height:50
                }
            }}>      
            <Tab.Screen name='InicioPersona' component={InicioPersona} initialParams={{idcuentaCiudadano:idcuentaCiudadano}}/>
            <Tab.Screen name='NuevoReporte' component={NuevoReporte} initialParams={{idcuentaCiudadano:idcuentaCiudadano}}/>
            <Tab.Screen name='Notificaciones' component={Notificaciones} initialParams={{idcuentaCiudadano:idcuentaCiudadano}}/>
            <Tab.Screen name='InfoPersona' component={InfoPersona} initialParams={{idcuentaCiudadano:idcuentaCiudadano}}/>
        </Tab.Navigator>
    )
    
}

const InfoBotBar = () =>{

    
    return(
        <Tab.Navigator initialRouteName='InfoPersona' 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'InicioPersona') {
                    iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'NuevoReporte') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline';
                }else if (route.name === 'Notificaciones') {
                    iconName = focused ? 'md-notifications' : 'md-notifications-outline';
                }else if (route.name === 'InfoPersona') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                }
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'white',
                style:{
                    backgroundColor:'#4ecdc4',
                    height:50
                }
            }}>      
            <Tab.Screen name='InicioPersona' component={InicioPersona}/>
            <Tab.Screen name='NuevoReporte' component={NuevoReporte}/>
            <Tab.Screen name='Notificaciones' component={Notificaciones}/>
            <Tab.Screen name='InfoPersona' component={InfoPersona}/>
        </Tab.Navigator>
)
}
const imagenes = {
    'home': require('../img/home.png'),
    'plus': require('../img/plus.png'),
    'bell': require('../img/bell.png')
}
const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.08,
        backgroundColor:'#4ecdc4',
        alignItems:'flex-end',
        alignContent:'flex-end',
        display: 'flex',
        flexDirection: 'row'
    },
    buttonContainer:{
        flex:3,
        height:Dimensions.get('window').height*0.08,
        justifyContent:'center',
        alignItems:'center',
        padding:22
    },
    imageContainer:{
        flex:3,
        height:Dimensions.get('window').height*0.8,
        borderColor:'green',
        borderWidth:2
    },
    imagen:{
        flex:1,
        resizeMode:'contain'
    },
    perfilContainer:{
        flex:1,
        height:Dimensions.get('window').height*0.10,
        backgroundColor:'yellow',
    }
})

export default MainBotBar;
export {InfoBotBar};