import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../Shared/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../Context/userLocationContext';

export default function HeaderMain({navigation}) {
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <View style={styles.profileMainContainer} >
      <View style={styles.profileContainer} >
          <Image source={require("../../assets/logo.jpg")}  style={styles.userImageStyle} />
        <View>
          <Text style={{color:"white"}} >Welcome, </Text>
          <Text style={{color:"white",fontSize:20}} >{state.user.first_name} {state.user.last_name} </Text>
        </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Account")} >
          <Image source={{uri:state.user.profile_picture}}  style={styles.userImageStyle} />
        </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingTop:40,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25
      },
      userImageStyle:{
        width:50,
        height:50,
        borderRadius:99,
        borderWidth:2,
        borderColor:Colors.white
      },
      profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:5
      },
      profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      }
})