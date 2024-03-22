import { View, Text, Dimensions,Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../Shared/Colors'
import { FontAwesome } from '@expo/vector-icons';

export default function SearchAnything({setSearchText}) {

  const [searchInput,setSearchInput] = useState()
  return (
    <View>
      <LinearGradient
        colors={[Colors.white,"transparent"]}
        style={{padding:25,marginTop:7,width:Dimensions.get("screen").width}}
      >
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
            <Text style={{fontSize:35,fontWeight:'bold'}} >Discover</Text>
            <Image source={require('../../assets/defaultImage/search.png')} style={{width:50,height:50,borderRadius:100}} />
        </View>
        <View style={{display:"flex",marginTop:5,flexDirection:'row',padding:10,gap:5,elevation:0.7,alignItems:'center',backgroundColor:Colors.white,borderRadius:7}} >
                <FontAwesome name="search" size={24} color={Colors.grey} />
                <TextInput placeholder='Search' style={{backgroundColor:Colors.white,width:"80%"}}  
                  onChangeText={(value) => setSearchInput(value)} 
                  onSubmitEditing={() => setSearchText(searchInput) }
                />
            </View>
      </LinearGradient>
    </View>
  )
}