import React, { Component, useState } from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { Button, Dimensions, ScrollView,
         StyleSheet, Text, TextInput, View } from 'react-native';

import TopBar from '../Components/TopBar';
import BotBar from '../Components/BotBar'
import { Picker } from '@react-native-community/picker';

export default class InfoPersona extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedSexo:'Hombre',  items:[],
            selectedAnio:1960,  selectedTipoId:'Cédula',Paises:[],
            selectedPais:'Costa Rica',Provincias :[],Cantones:[],
            Distritos:[],selectedProvinciaId:null,
            selectedCantonId:null,selectedDistritoId:null,
            Nombre: null,
            Apellido1: null,
            Apellido2: null,
            NumIdentificacion: null,
            Telefono1: null,
            Telefono2: null,
            idcuentaCiudadano :88//props.route.params.idcuentaCiudadano
        }
        this.initAnios()
        this.getProvincias()
        this.initPaises()
    }
    
    initAnios(){
        for (let index = 1900; index < 2011; index++) {
            this.state.items.push(<Picker.Item key='{index}' label={index.toString()} value={index} />)
        }
    }

    initPaises(){
        let paises = require('../resources/paises.json')
        paises = paises['countries']
        for(let pais in paises){
            this.state.Paises.push(<Picker.Item key="{paises[pais]['id']}" label={paises[pais]['name']} value={paises[pais]['name']} />)
        }
        
    }
    getProvincias(){
        fetch('https://ubicaciones.paginasweb.cr/provincias.json')
            .then(response => response.json())
            .then(data => this.initProvincias(data));
    }

    initProvincias(data){
        for(let obj in data){
            this.state.Provincias.push(<Picker.Item key='{obj}' label={data[obj]} value={obj} />)
        }
        this.setState({selectedProvinciaId:1})
    }

    getCantones(id){
        fetch('https://ubicaciones.paginasweb.cr/provincia/'+id+'/cantones.json')
            .then(response => response.json())
            .then(data =>  this.initCantones(data));
    }

    initCantones(data){
        this.setState({Cantones:[]})
        for(let obj in data){
            this.state.Cantones.push(<Picker.Item key='{obj}' label={data[obj]} value={obj} />)
        }
        this.setState({selectedCantonId:1})
        this.getDistritos(this.state.selectedCantonId)
    }
    getDistritos(idCanton){
        var idProvincia = this.state.selectedProvinciaId
        fetch('https://ubicaciones.paginasweb.cr/provincia/'+idProvincia+'/canton/'+idCanton+'/distritos.json')
            .then(response => response.json())
            .then(data =>  this.initDistritos(data));
    }

    initDistritos(data){
        this.setState({Distritos:[]})
        for(let obj in data){
            this.state.Distritos.push(<Picker.Item key='{obj}' label={data[obj]} value={obj} />)
        }
        this.setState({selectedDistritoId:1})
        
    }

    guardarInfoPersona(){
        var provincia = (this.state.Provincias[this.state.selectedProvinciaId-1]['props']['label'])
        var canton =(this.state.Cantones[this.state.selectedCantonId-1]['props']['label'])
        var distrito = (this.state.Distritos[this.state.selectedDistritoId-1]['props']['label'])
        console.log('--->guardarInfo()')
        fetch('http://192.168.0.156:3000/newInfoPersona',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Nombre:this.state.Nombre,
                Apellido1:this.state.Apellido1,
                Apellido2:this.state.Apellido2,
                Sexo:this.state.selectedSexo,
                AnioNacimiento:this.state.selectedAnio,
                PaisNacimiento:this.state.selectedPais,
                TipoIdentificacion:this.state.selectedTipoId,
                NumIdentificacion:this.state.NumIdentificacion,
                Provincia:provincia,
                Canton:canton,
                Distrito:distrito,
                Telefono1:this.state.Telefono1,
                Telefono2:this.state.Telefono2,
                idcuentaCiudadano:this.state.idcuentaCiudadano
            })
        })
        .then(response =>response.json())
        .then(data => {})
        .catch(error =>{
            console.log(error)
        })
    }
    render(){
        return(
            <View style = {styles.container}>
                <StatusBar style='auto'></StatusBar>
                <View >
                    <TopBar/>
                </View>
                <View style={{flex:11, width:Dimensions.get('window').width}}>
                    <ScrollView style = {styles.scroll}>
                        <Text style = {{fontSize:30, fontFamily: 'Roboto'}}>
                            Perfil del ciudadano
                        </Text>
                        <View style = {{borderColor:'black', borderWidth:1, padding:20}}>
                            <TextInput placeholder= 'Nombre' style={[styles.textInput]}
                                    onChangeText={(text) => this.setState({Nombre:text})}></TextInput>
                            <View  style= {{flexDirection:'row'}}>
                                <TextInput placeholder='Primer apellido' style={[styles.textInput, {flex:2, marginRight:10}]}
                                     onChangeText={(text) => this.setState({Apellido1:text})}></TextInput>
                                <TextInput placeholder= 'Segundo apellido' style={[styles.textInput, {flex:2, marginLeft:10}]}
                                     onChangeText={(text) => this.setState({Apellido2:text})}></TextInput>
                            </View>
                            <Text> Sexo:</Text>
                            <Picker
                                selectedValue={this.state.selectedSexo}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedSexo: itemValue })}>
                                <Picker.Item label="Hombre" value="Hombre" />
                                <Picker.Item label="Mujer" value="Mujer" />
                            </Picker>
                            <Text>Año de nacimiento</Text>
                            <Picker
                                selectedValue={this.state.selectedAnio}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedAnio: itemValue })}>
                                {this.state.items}
                            </Picker>
                            <Picker
                                selectedValue={this.state.selectedPais}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedPais: itemValue })}>
                                {this.state.Paises}
                            </Picker>
                            <Text>Tipo de identificación</Text>
                            <Picker
                                selectedValue={this.state.selectedTipoId}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedTipoId: itemValue })}>
                                <Picker.Item label="Cédula" value="Cédula" />
                                <Picker.Item label="DIMEX" value="DIMEX" />
                                <Picker.Item label="Pasaporte" value="Pasaporte" />
                                <Picker.Item label="Otro" value="Otro" />
                            </Picker>
                            <TextInput placeholder= 'Número de identificación' style={styles.textInput}
                                onChangeText={(text) => this.setState({NumIdentificacion:text})}></TextInput>
                            <Text>Dirección</Text>
                            

                            <View style = {{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{flex:1}}>Provincia</Text>
                                <Picker
                                    selectedValue={this.state.selectedProvinciaId}
                                    style={{ height: 50, flex:3}}
                                    onValueChange={(itemValue, itemIndex) =>{this.setState({ selectedProvinciaId: itemValue });this.getCantones(itemValue); }}>
                                    {this.state.Provincias}
                                </Picker>
                            </View>


                            <View style = {{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{flex:1}}>Cantón</Text>
                                <Picker
                                    selectedValue={this.state.selectedCantonId}
                                    style={{ height: 50, flex:3}}
                                    onValueChange={(itemValue, itemIndex) => {this.setState({ selectedCantonId: itemValue }); this.getDistritos(itemValue);}}>
                                    {this.state.Cantones}
                                </Picker>
                            </View>


                            <View style = {{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{flex:1}}>Distrito</Text>
                                <Picker
                                    selectedValue={this.state.selectedDistritoId}
                                    style={{ height: 50, flex:3}}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ selectedDistritoId: itemValue })}>
                                    {this.state.Distritos}
                                </Picker>
                            </View>
                            
                            <Text>Información de contacto</Text>
                            <TextInput placeholder= 'Número de teléfono' style={styles.textInput}
                                onChangeText={(text) => this.setState({Telefono1:text})}></TextInput>
                            <TextInput placeholder= 'Número de teléfono adicional' style={styles.textInput}
                                onChangeText={(text) => this.setState({Telefono2:text})}></TextInput>
                            <View style = {{flexDirection:'row', alignItems:'center'}}>
                                <View style = {{flex:2}}><Button title='Cancelar' ></Button></View>
                                <View style = {{flex:2}}><Button title='Guardar cambios' onPress={()=>this.guardarInfoPersona()}></Button></View>
                            </View>

                        </View>
        
                    </ScrollView>
                </View>
                <View style = {{flex :1}}>
                    <BotBar/>
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