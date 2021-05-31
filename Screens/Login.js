import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Image, 
        TextComponent, TextInput, View, Text,
        Dimensions, 
        TouchableOpacity} from 'react-native';

export default class Login extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Image style={styles.imagen} source ={imagenes['logo']}></Image>
                </View>
                <View style = {styles.credenciales}>
                    <TextInput style = {[styles.textInput, styles.text]} placeholder='Correo'></TextInput>
                    <TextInput style = {[styles.textInput, styles.text]} placeholder = 'Clave'></TextInput>
                    <View style={styles.botonInicioC} >
                        <TouchableOpacity style={styles.botonInicio} title='Login'>
                            <Text style = {styles.text} >Iniciar sesión</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style = {{
                        fontSize:15,
                        color:'white',
                        marginVertical:10
                        }}> ¿No tienes uan cuenta? Registrate
                    </Text>
                    <Text style = {{
                        fontSize:15,
                        color:'white',
                        marginVertical:10
                        }}> ¿Olvidaste tu contraseña?
                    </Text>
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
    flex: 1,
    backgroundColor: '#4ecdc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
      flex:2,
      marginTop:50,
      padding:35,
      width:Dimensions.get('window').width
  },
  imagen:{

      flex:1,
      padding:20,
      width:undefined,
      height:undefined,
      resizeMode:'contain'
  },
  credenciales:{
    flex:7,
    alignItems:'center'
  },
  textInput:{
      color: 'white',
      borderColor: 'white',
      borderBottomWidth:2,
      width: Dimensions.get('window').width-40,
      fontFamily: 'Roboto',
      marginVertical:20
  },
  botonInicio:{
    borderColor: 'white',
    borderWidth:2,
    borderRadius : 15,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    fontSize:20,
    width: Dimensions.get('window').width-40,
  },
  text:{
      fontSize:20,
      color:'white'
  }
});