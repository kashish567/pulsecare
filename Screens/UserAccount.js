import { View, TouchableOpacity,Text,StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/userLocationContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import HeaderMain from '../Components/MainHomeComponentsScreens/HeaderMain';

export default function UserAccount({navigation}) {
    const [state,setState] = useContext(AuthContext);
    const handleLogout = async () => {
        setState({token:"", user: null});
        await AsyncStorage.removeItem("@auth");
        Toast.show({
            type:'success',
            text1:'Logout Successfully'
        })
        navigation.navigate("Login")
    }
  return (
    <View style={styles.container}>
        <HeaderMain navigation={navigation}/>
        <View style={{marginTop:'100%'}}>
        <TouchableOpacity onPress={handleLogout} ><Text >Logout</Text></TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
    }
})