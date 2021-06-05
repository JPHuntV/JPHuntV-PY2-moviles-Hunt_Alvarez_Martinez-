import React, { Component, useState } from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { Button, Dimensions, ScrollView,
         StyleSheet, Text, TextInput, View } from 'react-native';

import TopBar from '../Components/TopBar';
import { Picker } from '@react-native-community/picker';


export default class Notificaciones extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <StatusBar style='auto'></StatusBar>
                <View >
                    <TopBar/>
                </View>
                <View style={{flex:11, width:Dimensions.get('window').width}}>
                    <ScrollView style = {styles.scroll}>
                        <Text> Notificaciones</Text>
                    </ScrollView>
                </View>
                <View style = {{flex :1}}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       //alignItems: 'center',
       //justifyContent: 'center'
    },
    topBar:{
        flex:1
    },
    textInput:{
        borderBottomWidth:2,
        borderColor:'black'

    },
    scroll:{
        width:Dimensions.get('window').width,
        padding:15
    }
})