import { View,Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import HeaderMain from './MainHomeComponentsScreens/HeaderMain'
import Slider from './MainHomeComponentsScreens/Slider'
import TherapyCategory from './MainHomeComponentsScreens/TherapyCategory'
import DoctorList from './MainHomeComponentsScreens/DoctorList'
import { AuthContext } from '../Context/userLocationContext'

export default function MainHomeComponent({navigation}) {
  const [state] = useContext(AuthContext);
  return (
    <View>
      <ScrollView>
      <HeaderMain navigation={navigation}/>
          <View style={{padding:20}} >
            <Slider/>
            <TherapyCategory/>
            <DoctorList navigation={navigation} />
          </View>
      </ScrollView>
    </View>
  )
}