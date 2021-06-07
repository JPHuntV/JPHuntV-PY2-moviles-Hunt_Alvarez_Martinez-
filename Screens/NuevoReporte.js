import React, { Component, useState } from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { Button, Dimensions, Image, ScrollView,
         StyleSheet, Text, TextInput, View } from 'react-native';
import TopBar from '../Components/TopBar';
import { Picker } from '@react-native-community/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DocPicker, { getFotos } from '../Components/FileUploader';
import Map from '../Components/Map';




export default class NuevoReporte extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            idcuentaCiudadano:props.route.params.idcuentaCiudadano,
            tiposItems:[], selectedTipo:null,
            tiposProblemasItems:[],selectedProblema:null,
            date:this.initDate(),
            fotos:[],
            descripcion:'',
            puntoTemp:{"latitude": null,"longitude": null}
        }
        this.initTipos()
        
    }
    
    initDate(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime
    }
    getDate(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        console.log(dateTime)
        this.setState({date:dateTime})
    }

    guardarFoto(){
        var Fotos = getFotos()
        console.log(Fotos.length)
        var index = 0
        Fotos.forEach(image => {
            console.log(image)
            if(image != null){
                        console.log('fotos: ',image.lenght)
                    }
                    
                    fetch('http://192.168.0.156:3000/foto', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            imgsource: image.base64,
                            uri:index
                        }),
                    })
                index++

            
        });
        
    }


    onLongPress = ({nativeEvent}) => {
        console.log(nativeEvent)
        this.setState({puntoTemp :nativeEvent.coordinate})

    }

    initTipos(){
        var tipos = require('../resources/TipoProblemas.json')
        console.log(this.state.idcuentaCiudadano)
        for(var obj in tipos){
            this.state.tiposItems.push(<Picker.Item key='{obj}' label={obj} value={obj} />)
        }
        this.initProblemas('Limpieza')
        
    }

    initProblemas(itemValue){
        var tipos = require('../resources/TipoProblemas.json')
        for(var tipo in tipos[itemValue]){
            console.log(tipo)
            this.state.tiposProblemasItems.push(<Picker.Item key='{obj}' label={tipo} value={tipo} />)
        }
        
    }
    guardarReporte(){
        
        for(var obj in tipos){
            console.log(obj)
            for(var tipo in tipos[obj]){
                console.log(tipo)
            }
        }
    }

    tiposItems (itemValue){
        var tipos = require('../resources/TipoProblemas.json')
        var lista = []
        console.log(this.state.selectedTipo)
        for(var tipo in tipos[itemValue]){
            console.log('esesesese: ', tipo)
            lista.push(<Picker.Item key='{tipo}' label={tipo} value={tipo} />)
        }
        return lista
    }
    render(){
        const { date } = this.state;
        return(
            <View style = {styles.container}>
                <StatusBar style='auto'></StatusBar>
                <View >
                    <TopBar/>
                </View>
                <View style={{flex:11, width:Dimensions.get('window').width}}>
                    <ScrollView style = {styles.scroll}>
                        <Text style = {{fontSize:30, fontFamily: 'Roboto'}}>
                            Hacer un reporte
                        </Text>
                        <View style = {{borderColor:'black', borderWidth:1, padding:20}}>
                            <Text>Tipo de reporte</Text>
                            <Picker
                                selectedValue={this.state.selectedTipo}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) =>{this.setState({ selectedTipo: itemValue });this.setState({tiposProblemasItems:this.tiposItems(itemValue)});}}>
                                {this.state.tiposItems}
                            </Picker>
                            <Text>Problema</Text>
                            <Picker
                                selectedValue={this.state.selectedProblema}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) =>{this.setState({ selectedProblema: itemValue });}}>
                                {this.state.tiposProblemasItems}
                            </Picker>
                            <Text>Fecha y hora</Text>
                            <Text>{this.state.date}</Text>
                            <TouchableOpacity onPress={()=>this.getDate()}><Text>test</Text></TouchableOpacity>
                            <DocPicker/>
                            <TouchableOpacity style = {{margin:10, backgroundColor:'red'}} onPress={() => this.guardarFoto()}><Text>asdfsdfs</Text></TouchableOpacity>
                            <Text> descripcion</Text>
                            <TextInput 
                                multiline={true} 
                                numberOfLines={5} 
                                placeholder='Describa su problema' 
                                maxLength={300}  
                                onChangeText={(text) => this.setState({descripcion:text})}
                                style={{textAlignVertical:'top',padding:10, borderWidth:1, borderColor:'black'}}>  
                            </TextInput>
                            <Text >{this.state.descripcion.length}/300</Text>
                            <Text >Ubicación del reporte</Text>
                            <View style = {{width:Dimensions.get('window').width, height:Dimensions.get('window').width, marginBottom:20}}>
                                <Map onLongPress = {this.onLongPress} x={this.state.puntoTemp.latitude} y={this.state.puntoTemp.longitude}/>
                            </View>
                            <View style={{marginTop:100}}>
                            <TouchableOpacity onPress={()=>this.guardarReporte()} style={{backgroundColor:'red'}}><Text>a</Text></TouchableOpacity>
                            </View>
                            
                            
                        </View>
                    </ScrollView>
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