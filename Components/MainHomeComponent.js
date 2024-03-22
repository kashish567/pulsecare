import { View,Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import HeaderMain from './MainHomeComponentsScreens/HeaderMain'
import Slider from './MainHomeComponentsScreens/Slider'
import TherapyCategory from './MainHomeComponentsScreens/TherapyCategory'
import DoctorList from './MainHomeComponentsScreens/DoctorList'

export default function MainHomeComponent({navigation}) {

  return (
    <View>
      <ScrollView>
      <HeaderMain navigation={navigation}/>
          <View style={{padding:20}} >
            <Slider/>
            <TherapyCategory/>
            <DoctorList/>
          </View>
      </ScrollView>
    </View>
  )
}