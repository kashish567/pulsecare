import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SearchMap from '../GoogleMapSearch/SearchMap';
import { MaterialIcons } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';
import TextDetect from '../../TextDetection/TextDetect';
import MainAppNavigation from '../../MainAppNavigation';
import UserAccount from '../../Screens/UserAccount';
import MainHomeComponent from '../../Components/MainHomeComponent';
import Colors from '../../Shared/Colors';
import ChatBot from '../../Chat/ChatBot';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppoinmentsFetched from '../../Screens/AppoinmentsFetched';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} tabBarOptions={{ activeTintColor: Colors.primary, inactiveTintColor: Colors.grey }}>
        <Tab.Screen name='Home' component={MainHomeComponent} options={{
            tabBarLabel:'Home',
            tabBarIcon : ({color}) => (
                <MaterialIcons name='home' color={color} size={35} />
            )
        }} />
        <Tab.Screen name='My_Appoinments' component={AppoinmentsFetched} options={{
            tabBarLabel:'Appoinments',
            tabBarIcon : ({color}) => (
                <MaterialIcons name='approval' color={color} size={35} />
            )
        }} />
        <Tab.Screen name='Map' component={HomeNavigation} options={{
            tabBarLabel:'Map',
            tabBarIcon : ({color}) => (
                <MaterialIcons name='map' color={color} size={35} />
            )
        }} />
        <Tab.Screen name='Search' component={SearchMap} options={{
            tabBarLabel:'Search',
            tabBarIcon : ({color}) => (
                <MaterialIcons name='search' color={color} size={35} />
            )
        }} />
        <Tab.Screen name='Text' component={TextDetect} options={{
            tabBarLabel:'Detect',
            tabBarIcon : ({color}) => (
                <MaterialIcons name='camera' color={color} size={35} />
            )
        }} />
        <Tab.Screen name='Chat' component={ChatBot} options={{
            tabBarLabel:'Chat',
            tabBarIcon : ({color}) => (
                <MaterialCommunityIcons name="robot-excited-outline" color={color} size={35} />            )
        }} />
    </Tab.Navigator>
  )
}