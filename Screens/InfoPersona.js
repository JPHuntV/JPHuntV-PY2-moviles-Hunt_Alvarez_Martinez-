import React, { Component, useState } from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { Button, Dimensions, ScrollView,
         StyleSheet, Text, TextInput, View } from 'react-native';

import TopBar from '../Components/TopBar';
import { Picker } from '@react-native-community/picker';

export default class InfoPersona extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedSexo:'Hombre',
            items:[],
            selectedAnio:null,
            selectedTipoId:null,
            Provincias :[],
            Cantones:[],
            Distritos:[],
            selectedProvinciaId:null,
            selectedProvinciaN:null,
            selectedCantonId:null,
            selectedCantonN:null,
            selectedDistritoId:null,
            selectedDistritonN:null
        }
        this.initAnios()
        this.getProvincias()
        
    }
    
    initAnios(){
        var date = new Date()
        for (let index = 1900; index < date.getFullYear()+1; index++) {
            this.state.items.push(<Picker.Item key='{index}' label={index.toString()} value={index} />)
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
        this.setState({selectedProvinciaN:data[1]})
        
    }

    getCantones(id){
        console.log('\n######\n')
        console.log('getCantones', id.toString())
        fetch('https://ubicaciones.paginasweb.cr/provincia/'+id+'/cantones.json')
            .then(response => response.json())
            .then(data =>  this.initCantones(data));
    }

    initCantones(data){
        this.setState({Cantones:[]})
        console.log('\n##Cantones##\n')
        for(let obj in data){
            this.state.Cantones.push(<Picker.Item key='{obj}' label={data[obj]} value={obj} />)
            console.log(obj, data[obj])
        }
        this.setState({selectedCantonId:1})
        this.getDistritos(this.state.selectedCantonId)
    }
    getDistritos(idCanton){
        var idProvincia = this.state.selectedProvinciaId
        console.log('Provincia', idProvincia.toString())
        console.log('Canton', idCanton.toString())
        fetch('https://ubicaciones.paginasweb.cr/provincia/'+idProvincia+'/canton/'+idCanton+'/distritos.json')
            .then(response => response.json())
            .then(data =>  this.initDistritos(data));
    }

    initDistritos(data){
        console.log('\n##Distritos##\n')
        this.setState({Distritos:[]})
        for(let obj in data){
            this.state.Distritos.push(<Picker.Item key='{obj}' label={data[obj]} value={obj} />)
            console.log(obj, data[obj])
        }
        this.setState({selectedDistritoId:1})
        
    }
    render(){
        return(
            <View style = {styles.container}>
                <StatusBar style='light'></StatusBar>
                <View >
                    <TopBar/>
                </View>
                <View style={{flex:8, width:Dimensions.get('window').width}}>
                    <ScrollView style = {styles.scroll}>
                        <Text style = {{fontSize:30, fontFamily: 'Roboto'}}>
                            Perfil del ciudadano
                        </Text>
                        <View style = {{borderColor:'black', borderWidth:1, padding:20}}>
                            <TextInput placeholder= 'Nombre' style={[styles.textInput]}></TextInput>
                            <View  style= {{flexDirection:'row'}}>
                                <TextInput placeholder='Primer apellido' style={[styles.textInput, {flex:2, marginRight:10}]}></TextInput>
                                <TextInput placeholder= 'Segundo apellido' style={[styles.textInput, {flex:2, marginLeft:10}]}></TextInput>
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
                            <TextInput placeholder= 'Número de identificación' style={styles.textInput}></TextInput>
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
                            <TextInput placeholder= 'Número de teléfono' style={styles.textInput}></TextInput>
                            <TextInput placeholder= 'Número de teléfono adicional' style={styles.textInput}></TextInput>
                            <TextInput placeholder= 'Correo electrónico' style={styles.textInput}></TextInput>
                            <View style = {{flexDirection:'row', alignItems:'center'}}>
                                <View style = {{flex:2}}><Button title='Cancelar' s></Button></View>
                                <View style = {{flex:2}}><Button title='Guardar cambios'></Button></View>
                            </View>
                            






                        </View>
        
                    </ScrollView>
                </View>
                <View style = {{flex :1}}>
                    <TopBar/>
                </View>
                
            </View>
        )
    }
}
async function getProvincias() {
    const response = await fetch('https://ubicaciones.paginasweb.cr/provincias.json');
    var data = await response.json();
    return data
    
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