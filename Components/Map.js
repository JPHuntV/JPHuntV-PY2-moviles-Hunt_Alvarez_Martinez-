import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location'


var latitud = null
var longitud = null
const getLat = () =>{
  console.log('Me llamaron', latitud)
  return latitud
}
const getLon = () =>{
  console.log('Me llamaron', longitud)
  return longitud
}
const Map= ( {onLongPress,x,y}) => {
  const [coordenadas, setcord] = useState('')
  const {height, width} = Dimensions.get('window')
  const LatDelt = 0.001
  const LonDelt = LatDelt / (width/height)
  
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  
 useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      if(x==null) latitud = location.coords.latitude
      if(y==null) longitud =  location.coords.longitude
      return(
          <MapView 
            onLongPress = {onLongPress}
            style = {styles.map}
           
            initialRegion={{latitude:latitud ,longitude:longitud, latitudeDelta:LatDelt, longitudeDelta:LonDelt}}
          >
          
            <Marker coordinate={{latitude: latitud, longitude:longitud}}></Marker>
          </MapView>
      );
    }

    return (
      <View >
        <Text >a</Text>
      </View>
    );
  


}
const styles = StyleSheet.create({
    map: {
      height: Dimensions.get('screen').width,
      width: Dimensions.get('screen').width
    }
  });
  
export default Map
export {getLat, getLon}
  