import { View, Text, Image } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import HorizontalLine from "./HorizontalLine.js";

export default function MiddleBig({ place }) {
  return (
    <View style={{marginTop:20}}>
     {place?.photos?  <Image
        source={{
          uri:
            "https://maps.googleapis.com/maps/api/place/photo" +
            "?maxwidth=400" +
            "&photo_reference=" +
            place?.photos[0]?.photo_reference +
            "&key=AIzaSyBuzdncg4T0lTNQ_UQyDuLzrIMyD_GvQwA",
        }}
        style={{ width: "100%", height: 160, borderRadius: 15 }}
      />:<Image source={require('../../assets/defaultImage/hospitalBuilding.png')}
      style={{ width: "100%", height: 160, borderRadius: 15 }}
      />}
      <Text
        numberOfLines={2}
        style={{ fontSize: 18, marginBottom: 2, fontWeight:'bold',marginTop:6 }}
      >
        {place.name}
      </Text>
      <Text
        style={{ fontSize: 15, marginBottom: 5 }} numberOfLines={2}>
        {place.vicinity}
      </Text>
      <View style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexDirection: "row",}}>
          <MaterialIcons name="star" size={20} color='gold' />
          <Text style={{fontWeight:'500'}} >{place.rating}</Text>
        </View>
          <HorizontalLine/>
    </View>
  );
}