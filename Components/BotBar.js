import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

export default class BotBar extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style={styles.buttonContainer}>
                    <Image style={styles.imagen} source ={imagenes['home']}></Image>
                </View>
                <View style={styles.buttonContainer}>
                <Image style={styles.imagen} source ={imagenes['plus']}></Image>
                </View>
                <View style={styles.buttonContainer}>
                    <Image style={styles.imagen} source ={imagenes['bell']}></Image>
                </View>
            </View>
        )
    }
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