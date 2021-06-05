import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Image, 
        TextComponent, TextInput, View, Text,
        Dimensions, 
        TouchableOpacity} from 'react-native';
import md5 from 'md5'
export default class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            correo: 'dani21@gmail.com',//devolver a nulll!!!
            clave:'1fa15033b7c585c603448edb6ee4875f',//devolver a null!!!!!
        }
    }

    Login(){
        console.log('---->Login()')
        fetch('http://192.168.0.156:3000/LoginUser',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                correo:this.state.correo,
                clave:this.state.clave
            })
        })
        .then(response =>response.json())
        .then(data => {
            if(data['msj']){
                console.log('id del ciudadano: [', data['idCiudadano'], ']')
                this.props.navigation.navigate('InicioPersona', {idcuentaCiudadano: data['idCiudadano']})
            }
        })
        .catch(error =>{
            console.log(error)
        })
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Image style={styles.imagen} source ={imagenes['logo']}></Image>
                </View>
                <View style = {styles.credenciales}>
                    <TextInput onChangeText={(text) => this.setState({correo:text})} 
                        style = {[styles.textInput, styles.text]} placeholder='Correo'></TextInput>
                    <TextInput onChangeText={(text) => this.setState({clave:md5(text)})}
                                secureTextEntry style = {[styles.textInput, styles.text]} placeholder = 'Clave'></TextInput>
                    <View style={styles.botonInicioC} >
                        <TouchableOpacity onPress={() => this.Login()} style={styles.botonInicio} title='Login'>
                            <Text style = {styles.text} >Iniciar sesión</Text>
                        </TouchableOpacity>
                    </View>
                    <Text onPress={() => this.props.navigation.navigate('Register')}
                        style = {{
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