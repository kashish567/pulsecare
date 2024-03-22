import { View, TouchableOpacity,Text,StyleSheet, Dimension,TextInput,Dimensions, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/userLocationContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import HeaderMain from '../Components/MainHomeComponentsScreens/HeaderMain';
import { ThemedButton } from 'react-native-really-awesome-button';
import Colors from '../Shared/Colors';

export default function UserAccount({navigation}) {
    const [state,setState] = useContext(AuthContext);
    const {user,token} = state;

    const updateUser = async () => {
      try{

      }catch(error){
        console.log(error)
      }
    }

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
    <View >
      <HeaderMain navigation={navigation} />
    <View style={styles.formStyle}>
    <View style={{display:"flex",flexDirection:'row', justifyContent:'space-evenly',margin:5}} >
      <View style={{backgroundColor:Colors.primary,padding:13,borderRadius:50 }} >
          <Text style={styles.formHeading}>Update Profile</Text>
      </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>First Name</Text>
        <TextInput placeholder="Your first name" placeholderTextColor={Colors.secondary} keyboardType="default"  style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Last Name</Text>
        <TextInput placeholder="Your last name" placeholderTextColor={Colors.secondary} keyboardType="default" style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Email Id</Text>
        <TextInput placeholder="Your Email Id" placeholderTextColor={Colors.secondary} keyboardType="default" style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Password</Text>
        <TextInput placeholder="Your password" placeholderTextColor={Colors.secondary} keyboardType="default" secureTextEntry={true} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginTop: 25 }}>
        <ThemedButton name="rick" type="twitter" borderRadius={10} width="100%">
          Update
        </ThemedButton>
      </View>
      <View style={{ marginTop: 25 }}>
        <ThemedButton name="rick" type="pinterest" borderRadius={10} width="100%" onPress={handleLogout} >
          Logout
        </ThemedButton>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textFieldStyle: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1,
    paddingVertical: 0,
    marginTop: 5,
  },
  textFieldLabel: {
    fontSize: 16,
    color: Colors.primary,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  formStyle: {
    elevation: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 12,
    marginTop:25,
    paddingVertical: 20,

    paddingHorizontal: 15,
    justifyContent:'center'
  },
  header: {
    color: Colors.white,
    fontSize: 31,
    fontWeight: 'bold',
    marginTop: 25,
  },
  main: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: Dimensions.get('window').height * 0.25,
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
  },
  registerBold: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  registerAccount: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
  },
});
