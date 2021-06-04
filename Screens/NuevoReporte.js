import React, { Component, useState } from 'react';
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import { Button, Dimensions, ScrollView,
         StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TopBar from '../Components/TopBar';
import BotBar from '../Components/BotBar'
import { Picker } from '@react-native-community/picker';


export default class NuevoReporte extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTipo:'Hombre',
            selectedProblema: 'a',
            date:new Date()
        }
        
    }
    test(){
        console.log('a')
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
                                selectedValue={this.state.selectedSexo}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedSexo: itemValue })}>
                                <Picker.Item label="Hombre" value="Hombre" />
                                <Picker.Item label="Mujer" value="Mujer" />
                            </Picker>
                            <Text>Problema</Text>
                            <Picker
                                selectedValue={this.state.selectedSexo}
                                style={{ height: 50}}
                                onValueChange={(itemValue, itemIndex) => this.setState({ selectedSexo: itemValue })}>
                                <Picker.Item label="Hombre" value="Hombre" />
                                <Picker.Item label="Mujer" value="Mujer" />
                            </Picker>
                            <Text>sss</Text>
                            <DateTimePicker 
                                value={ date }
                                mode='default'
                                display='default'
                                onChange={ date => this.setState({ date:date }) } />
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