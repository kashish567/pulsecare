import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../Shared/Colors'
import SearchItem from './SearchItem'
import { useNavigation } from '@react-navigation/native'

export default function SearchList({placeList}) {
  const navigation = useNavigation()
  return (
    <View>
      <LinearGradient
        colors={["transparent",Colors.white]}
        style={{padding:25,marginTop:7,width:Dimensions.get("screen").width}}
      >
        <FlatList 
          data={placeList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) => index<=6 &&(
            <TouchableOpacity onPress={() => navigation.navigate("place-detail",{place:item})} >
              <SearchItem place={item} />
            </TouchableOpacity>
          )}
        />
      </LinearGradient>
    </View>
  )
}