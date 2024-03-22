import { ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../MapComponents/Header'
import GoogleMapView from '../MapComponents/GoogleMapView'
import CategoryList from '../MapComponents/CategoryList'
import Services from './Services'
import PlaceList from '../MapComponents/PlaceList'
import { userLocationContext } from '../../Context/userLocationContext'
import HeaderMain from '../../Components/MainHomeComponentsScreens/HeaderMain'

export default function HomeMap({navigation}) {

  const [placeList,setPlaceList] = useState([]);
  const {location,setLocation} = useContext(userLocationContext)

  useEffect(() => {
    if(location){
      getNearBySearchPlace('hospital')
    }
  },[location])

  const getNearBySearchPlace = (value) => {
    Services.nearBYPlaces(location.coords.latitude,location.coords.longitude,value).then(res => {
      setPlaceList(res.data.results);
      console.log(res.data.results)
    })
  } 

  return (
    <ScrollView style={{backgroundColor:'fff',flex:1}}>
      <HeaderMain navigation={navigation}/> 
      <GoogleMapView placeList={placeList} />
      <CategoryList setSelectedCategory={(value)=>getNearBySearchPlace(value)} />
      {placeList? <PlaceList placeList={placeList} />:null}
    </ScrollView>
  )
}