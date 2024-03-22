import { View, Image,Text} from 'react-native'
import React from 'react'
import Colors from '../../Shared/Colors'
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchItem({place}) {
  return (
    <View style={{width:140,backgroundColor:Colors.white,borderRadius:10,margin:5,padding:10,elevation:0.5}} >
      {place?.photos? <Image 
        source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyAOlGVaAlNnI26UtG-nnLhxdzg4_so-bzw",
          }}
          style={{width:120,height:80,borderRadius:10}} />
        :
        <Image source={require('../../assets/defaultImage/hospitalBuilding.png')} 
          style={{width:130,height:100,borderRadius:9}}
        />
        }

        <Text numberOfLines={2} style={{fontSize:16,marginTop:5}} >{place.name}</Text>
        <Text numberOfLines={2} style={{fontSize:13,marginTop:5,color:Colors.grey}}>{place.vicinity?SearchItem.vicinity:place.formatted_address}</Text>
        <View style={{display:'flex',alignItems:'center',gap:5,marginTop:5,flexDirection:'row',marginBottom:-5}} >
            <MaterialIcons name='star' size={20} color="gold" />
            <Text>{place.rating}</Text>
        </View>
    </View>
  )
}