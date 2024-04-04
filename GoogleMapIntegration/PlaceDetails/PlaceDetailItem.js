import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../Shared/Colors';
import Share from '../MapScreens/ShareLocation'

export default function PlaceDetailItem({place,onDirectionClick,navigation}) {
  return (
    <View>
        <Text style={{fontSize:20}} >{place.name}</Text>
        <View style={{display:"flex",alignItems:"center",gap:5,marginTop:5,flexDirection:"row"}} >
            <MaterialIcons name='star' color="gold" size={25}  />
            <Text>{place.rating}</Text>
        </View>
        {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyBuzdncg4T0lTNQ_UQyDuLzrIMyD_GvQwA",
          }}
          style={{
            width: "100%",
            height: 210,
            borderRadius: 15,
            marginTop: 10,
          }}
        />
      ) : <Image
      source={require("../../assets/defaultImage/hospitalBuilding.png")}
      style={{
        width: "100%",
        height: 210,
        borderRadius: 15,
        marginTop: 10,
      }}
    />}
      <Text style={{ fontSize: 16, marginTop: 10 }} numberOfLines={2}>
        {place.vicinity?place.vicinity:place.formatted_address}
      </Text>
      {place?.opening_hours ? (
        <Text>
          {place?.opening_hours?.open_now == true ? 
          "Currently it is Open" : 
          "Currently it is Closed"}
        </Text>
      ) : null}
      <View style={{marginTop:10,flexDirection:'row',
    display:'flex', gap:10}}>
        <TouchableOpacity onPress={()=>onDirectionClick()}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor:Colors.grey,
            width:110,
            padding:3,
            borderRadius:40,
            justifyContent:'center'
          }}
        >
          <Ionicons name="navigate-circle-outline" size={24} color="black" />
          <Text style={{ fontFamily: "raleway", fontSize: 16 }}>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Share.ShareLocation(place)}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor:Colors.grey,
            width:90,
            padding:3,
            borderRadius:40,
            justifyContent:'center'
          }}
        >
         <FontAwesome5 name="share-alt" size={24} color="black" />
          <Text style={{ fontSize: 16 }}>Share</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}