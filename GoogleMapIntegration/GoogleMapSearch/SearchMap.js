import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GoogleMapFullView from './GoogleMapFullView'
import SearchAnything from './SearchAnything'
import { userLocationContext }  from '../../Context/userLocationContext'
import Services from '../MapScreens/Services'
import SearchList from './SearchList'

export default function SearchMap({navigation}) {
  const [placeList,setPlaceList] = useState([]);
  const {location,setLocation} = useContext(userLocationContext)

  useEffect(() => {
    if(location){
      GetNearBySearchPlace('hospital')
    }
  },[location])
  
  const GetNearBySearchPlace=(value) => {
    Services.searchByText(value).then(res => {
      setPlaceList(res.data.results)
    })
  }
  return (
    <View>
      <View style={{position:'absolute', zIndex:20}} >
        <SearchAnything setSearchText={(value) => GetNearBySearchPlace(value)} />
      </View>
      <GoogleMapFullView placeList={placeList} />
      <View style={{position:'absolute',zIndex:20,bottom:0}}>
        <SearchList placeList={placeList} />
      </View>
    </View>
  )
}