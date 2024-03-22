import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Shared/Colors'
import { MaterialIcons } from '@expo/vector-icons';

export default function HeaderMain({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.profileMainContainer} >
      <View style={styles.profileContainer} >
          <Image source={require("../../assets/favicon.png")}  style={styles.userImageStyle} />
        <View>
          <Text style={{color:"white"}} >Welcome, </Text>
          <Text style={{color:"white",fontSize:20}} >Meet Dodiya</Text>
        </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Account")} >
          <MaterialIcons name='account-circle' color="white" size={35} />
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
        width:45,
        height:45,
        borderRadius:99
      },
      profileContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:10
      },
      profileMainContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      }
})