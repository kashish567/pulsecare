import { View,Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/userLocationContext'
import HeaderMain from './MainHomeComponentsScreens/HeaderMain'
import Slider from './MainHomeComponentsScreens/Slider'
import TherapyCategory from './MainHomeComponentsScreens/TherapyCategory'
import DoctorList from './MainHomeComponentsScreens/DoctorList'
import { CurrentUserContext } from '../Context/currentUser'

export default function MainHomeComponent({navigation}) {

  const [state] = useContext(AuthContext);
  // const [user] = useContext(CurrentUserContext)
  console.log(state)
  return (
    <View>
      <ScrollView>
      <HeaderMain navigation={navigation}/>
          <View style={{padding:20}} >
          <Text>{JSON.stringify(state,null,4)}</Text>
          <Text>{JSON.stringify(state.user,null,4)}</Text>
            <Slider/>
            <TherapyCategory/>
            <DoctorList/>
          </View>
      </ScrollView>
    </View>
  )
}