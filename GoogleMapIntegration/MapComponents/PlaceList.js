import React from 'react'
import { Text, View,StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import PlaceItem from './PlaceItem'
import MiddleBig from './MiddleBig'
import { useNavigation } from '@react-navigation/native'

export default function PlaceList({placeList}) {

  const navigator = useNavigation();

  const onPlaceClick = (item) => {
    navigator.navigate('place-detail',{place:item});
  }
  
  return (
    <View style={{padding:15}} >
      <Text style={styles.headingText} >Found {placeList.length} places</Text>
      <FlatList data={placeList} renderItem={({item,index}) => (
        <TouchableOpacity onPress={() => onPlaceClick(item)} >
          {index%5==0?
          <MiddleBig place={item} />
          :<PlaceItem place={item} />}
        </TouchableOpacity>
      )} />
    </View>
  )
}

const styles = StyleSheet.create({
  headingText:{
    fontSize:20,
  }
})
