import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screens/Auth/Register';
import Login from './Screens/Auth/Login';
import Welcome from './Screens/Welcome';
import { AuthContext } from './Context/userLocationContext';
import UserAccount from './Screens/UserAccount';
import TabNavigation from './GoogleMapIntegration/MapComponents/TabNavigation';
import DoctorRegister from './Screens/Auth/doctorAuth/DoctorRegister';

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
        <Stack.Screen name='DoctorRegister' component={DoctorRegister} options={{headerShown:false}}  />
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}  />
        </>
        )
      }
    </Stack.Navigator>
  )
}