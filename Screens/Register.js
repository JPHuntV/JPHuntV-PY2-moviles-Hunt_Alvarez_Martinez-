import React, { Component } from 'react';
import { Button, StyleSheet, Image, 
        TextComponent, TextInput, View, Text,
        Dimensions, 
        TouchableOpacity} from 'react-native';
import md5 from 'md5'



export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            correo: null,
            clave1:null,
            clave2:null
        }
    }

    registrar(){
        if(this.state.clave1 == this.state.clave2){
            fetch('http://192.168.0.156:3000/newPersona',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    correo:this.state.correo,
                    clave:this.state.clave1
                })
            })
            .then(response =>response.json())
            .then(data => {
                if(data['msj']){
                    fetch('http://192.168.0.156:3000/getId',{
                        method:'POST',
                        headers:{
                            Accept:'application/json',
                            'Content-Type':'application/json'
                        }
                    })
                    .then(response =>response.json())
                    .then(data => {
                        idCiudadano = data['id']
                        this.props.navigation.navigate('InfoPersona',{idcuentaCiudadano: idCiudadano})
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }
            })
            .catch(error =>{
                console.log(error)
            })
        }else{
            console.log('no coinciden')
        }
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
                    <TextInput onChangeText={(text) => this.setState({clave1:md5(text)})}
                                secureTextEntry style = {[styles.textInput, styles.text]} 
                                placeholder = 'Clave'></TextInput>
                    <TextInput onChangeText={(text) => this.setState({clave2:md5(text)})}
                                secureTextEntry style = {[styles.textInput, styles.text]} 
                                placeholder = 'Confirmar clave'></TextInput>
                    <View style={styles.botonInicioC} >
                        <TouchableOpacity style={styles.botonInicio} onPress={() =>this.registrar()} title='Login'>
                            <Text style = {styles.text} >Registrarse</Text>
                        </TouchableOpacity>
                    </View>
                    <Text onPress={() => this.props.navigation.navigate('Login')}
                        style = {{
                        fontSize:15,
                        color:'white',
                        marginVertical:10
                        }}> ¿Ya tienes una cuenta? Inicia Sesión
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