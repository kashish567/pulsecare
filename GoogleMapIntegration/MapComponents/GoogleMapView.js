import { View, StyleSheet, Dimensions,Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Colors from '../../Shared/Colors'
import { userLocationContext } from '../../Context/userLocationContext'
import PlaceMarker from './PlaceMarker'

export default function GoogleMapView({placeList}) {

    const {location,setLocation} = useContext(userLocationContext);
    const [mapRegion, setmapRegion] = useState([]);

    useEffect(() => {
        if(location){
            setmapRegion({
                latitude: location.coords.latitude ? location.coords.latitude :0 ,
                longitude: location.coords.longitude ? location.coords.longitude : 0,
                latitudeDelta: 0.006,
                longitudeDelta: 0.0100,
            })
        }
    },[location])

  return (
    <View style={styles.container} >
        <Text style={styles.textStyle}>
            Nearest Distance
        </Text>
        <View style={{overflow:'hidden',borderRadius:20}}>
        {location?    <MapView
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        >
            <Marker 
            title="You" 
            coordinate={mapRegion}
             />
            {placeList.map((item,index)=>index<=5&&(
                <PlaceMarker item={item} key={index} />
            ))}
           
        </MapView>:null} 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:5,
        padding:15
    },
    mapStyle:{
        height:Dimensions.get('screen').height*0.23,
        width:Dimensions.get('screen').width*0.90, 
    },
    textStyle:{
        fontSize:20, 
        marginBottom:15,
        fontWeight:"600",
        fontFamily:'Anta',
        color:Colors.black
    }
})