import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ScrollView, Dimensions, StyleSheet, ImageBackground, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from '@expo/vector-icons/Ionicons'

var listaFotos = []
export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [fotosItems, setFotosItems] = useState([])
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
      base64:true,
      
    });

    if (!result.cancelled) {
      setImage(result.uri);
      listaFotos.push(result)
      var index = listaFotos.length
      setFotosItems(fotosItems=>[fotosItems,<ImageBackground key={index} source={{ uri: result.uri }} style={styles.imagen}>
                                                <TouchableHighlight style={styles.iconContainer} onPress={() => console.log(fotosItems)}>
                                                  <Icon size={30} name="trash-outline" color='white' />
                                                </TouchableHighlight>                                     
                                            </ImageBackground>])

    }
  };


  const removeFoto = async (id) =>{
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    console.log(fotosItems)
    /*var tempList = fotosItems
    for (let index = 0; index < tempList.length; index++) {
      console.log(fotosItems[index])
      
    }*/
    
    setFotosItems(fotosItems => fotosItems.filter((item,i) => i!== id))
    console.log('fotoid:'  ,id)
  }


  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView horizontal={true} on>
        {fotosItems}
      </ScrollView>
      <Button title="Pick an image from camera roll" onPress={()=>pickImage()} />
    </View>
    
  );
}


const styles = StyleSheet.create({
  imagen:{
    width: Dimensions.get('window').width-120, 
    height: Dimensions.get('window').width-120,
    margin:10,
    flexDirection:'row-reverse'
    
  },
  iconContainer:{
    backgroundColor:'black', 
    opacity:0.5, 
    width:40,
    justifyContent:'center', 
    alignItems:'center'
  }
})
const getFotos = () =>{
    return listaFotos
}
export {getFotos}