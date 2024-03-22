import { Image } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

export default function PlaceMarker({item}) {
  return (
    <Marker
        title={item.name}
        coordinate={
            {
                latitude: item.geometry.location.lat ? item.geometry.location.lat : 0,
                longitude: item.geometry.location.lng ? item.geometry.location.lng : 0,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
            }
        }
    >
      <Image source={require("../../assets/defaultImage/mapMarker.png")} style={{width:30,height:40}} />
    </Marker>
  )
}