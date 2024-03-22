import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screens/Auth/Register';
import Login from './Screens/Auth/Login';
import Welcome from './Screens/Welcome';
import Otp from './Screens/Auth/Otp';
import { AuthContext } from './Context/userLocationContext';
import UserAccount from './Screens/UserAccount';
import TabNavigation from './GoogleMapIntegration/MapComponents/TabNavigation';
import HeaderMain from './Components/MainHomeComponentsScreens/HeaderMain';

export default function MainAppNavigation() {

    const Stack = createNativeStackNavigator();
    const [state] = useContext(AuthContext);
    const authUser = state?.token

  return (
    <Stack.Navigator initialRouteName='Welcome' >
      {
        authUser ? 
        (
        <>
        <Stack.Screen name='HomScreen' component={TabNavigation} options={{headerShown:false}} />
        <Stack.Screen name='Account' component={UserAccount} options={{headerShown:false}} />
        </> 
        ) : (
        <>
        <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}  />
        <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}  />
        <Stack.Screen name='Otp' component={Otp} options={{headerShown:false}} />    
        </>
        )
      }
    </Stack.Navigator>
  )
}