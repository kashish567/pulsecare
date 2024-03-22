import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import HomeMap from '../MapScreens/HomeMap';
import PlaceDetail from '../PlaceDetails/PlaceDetail';

export default function HomeNavigation({navigation}) {
    const Stack = createStackNavigator();
    const isAndroid=true;
  return (
    <Stack.Navigator screenOptions={{
        gestureEnabled:true, 
        ...(isAndroid&&TransitionPresets.ModalPresentationIOS),
        }}>
        <Stack.Screen name='home-screen' component={HomeMap} options={{headerShown:false}} />
        <Stack.Screen name='place-detail' component={PlaceDetail}  screenOptions={{ presentation:'model'}} options={{title:""}} />
    </Stack.Navigator>
  )
}