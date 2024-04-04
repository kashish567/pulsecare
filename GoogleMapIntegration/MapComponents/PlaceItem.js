import React from 'react'
import { View,StyleSheet,Text,Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import HorizontalLine from './HorizontalLine';

export default function PlaceItem({place}) {
  return (
<View
style={{
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 15,
  marginTop:20
}}
>
{place?.photos?  <Image
  source={{uri: "https://maps.googleapis.com/maps/api/place/photo"+"?maxwidth=400"+"&photo_reference="+place?.photos[0]?.photo_reference+"&key=AIzaSyBuzdncg4T0lTNQ_UQyDuLzrIMyD_GvQwA"}}
  style={{ width: 110, height: 110, borderRadius: 15 }}
/>:
<Image source={require('../../assets/defaultImage/hospitalBuilding.png')}
style={{ width: 110, height: 110, borderRadius: 15 }}
/>}
<View style={{flex:1}}>
  <Text numberOfLines={2} style={{ fontSize: 18, marginBottom: 5,fontWeight:'bold'}} >{place.name}</Text>
  <Text style={{ fontSize: 15,marginBottom: 5 }} numberOfLines={2}>{place.vicinity}</Text>
  <View style={{display: "flex", alignItems: "center", gap: 5, flexDirection: "row",}}>
    <MaterialIcons name="star" size={20} color='gold' />
    <Text style={{fontWeight:'500'}}>{place.rating}</Text>
  </View>
  <HorizontalLine/>
</View>
</View>
  )
}

const style = StyleSheet.create({
  
})