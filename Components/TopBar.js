import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

export default class TopBar extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Image style={styles.imagen} source ={imagenes['logo']}></Image>
                </View>
            </View>
        )
    }
}
const imagenes = {
    'logo': require('../img/munimovil.png'),
    'user': require('../img/user.png')
}
const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.12,
        backgroundColor:'#4ecdc4',
        alignItems:'flex-end',
        //alignContent:'flex-end',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageContainer:{
        flex:6,
        height:Dimensions.get('window').height*0.10,
        justifyContent:'center'
    },
    imagen:{
        flex:1,
        resizeMode:'contain'
    },
    perfilContainer:{
        flex:1,
        height:Dimensions.get('window').height*0.10,
        backgroundColor:'#4ecdc4',
        justifyContent:'center',
        alignItems:'center',
        padding:25,
        marginTop:200

    }
})