import { View ,StyleSheet, Dimensions} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { userLocationContext } from '../../Context/userLocationContext';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import PlaceMarker from '../MapComponents/PlaceMarker';

export default function GoogleMapFullView({placeList}) {

    const {location,setLocation} = useContext(userLocationContext);
    const [mapRegion, setmapRegion] = useState([]);

    useEffect(() => {
        if(location){
            setmapRegion({
                latitude: location.coords.latitude ? location.coords.latitude :0 ,
                longitude: location.coords.longitude ? location.coords.longitude : 0,
                latitudeDelta: 0.009,
                longitudeDelta: 0.0100,
            })
        }
    },[location])
  return (
    <View style={{marginTop:10}} >
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
        {placeList.map((item,index) => index<=5 && (
            <PlaceMarker item={item} key={index} />
        ))

        }
        </MapView>:null} 
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:5,
        padding:15
    },
    mapStyle:{
        height:Dimensions.get('screen').height*0.88,
        width:Dimensions.get('screen'), 
    }
})