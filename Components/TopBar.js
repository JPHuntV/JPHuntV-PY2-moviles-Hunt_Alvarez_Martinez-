import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

export default class TopBar extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Image style={styles.imagen} source ={imagenes['logo']}></Image>
                </View>
                <View style = {styles.perfilContainer}>
                    <Text> aaaa</Text>
                </View>
            </View>
        )
    }
}
const imagenes = {
    'logo': require('../img/munimovil.png')
}
const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.12,
        backgroundColor:'#4ecdc4',
        alignItems:'flex-end',
        alignContent:'flex-end',
        display: 'flex',
        flexDirection: 'row'
        //justifyContent: 'center'
    },
    imageContainer:{
        flex:3,
        height:Dimensions.get('window').height*0.10,
        //width:Dimensions.get('window').height*0.10*3,
        borderColor:'green',
        borderWidth:2
        //paddingRight:20
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