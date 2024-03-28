import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Screens/Auth/Register';
import Login from './Screens/Auth/Login';
import Welcome from './Screens/Welcome';
import { AuthContext } from './Context/userLocationContext';
import UserAccount from './Screens/UserAccount';
import TabNavigation from './GoogleMapIntegration/MapComponents/TabNavigation';
import DoctorRegister from './Screens/Auth/doctorAuth/DoctorRegister';
import Appoinment from './Screens/Appoinment';
import DoctorList from './Components/MainHomeComponentsScreens/DoctorList';
import Feedback from './Screens/Feedback';

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
        <Stack.Screen name='Appointment' component={Appoinment} options={{headerShown:false}} />
        <Stack.Screen name='DoctorList' component={DoctorList} options={{headerShown:false}} />
        <Stack.Screen name='Feedback' component={Feedback} options={{headerShown:false}} />
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