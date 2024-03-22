import { View, Text,StyleSheet, Dimensions, TextInput, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../../Shared/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemedButton } from 'react-native-really-awesome-button'
import Toast from 'react-native-toast-message';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../Context/userLocationContext'

export default function Login({navigation}) {

  const[state,setState] = useContext(AuthContext)
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async () => {
    try{
      if(!email || !password){
        Toast.show({
          type: 'error',
          text1: 'All Fields are Required!',
        });
        return
      }

      const {data} = await axios.post('/auth/login',{
        email,password
      });

      Toast.show({
        type: 'success',
        text1: data?.message,
      });

      setState(data);

      await AsyncStorage.setItem('@auth',JSON.stringify(data));

      navigation.navigate("HomScreen")

    }catch(error){
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error.message
      });
    }
  }

  return (
    <View>
    <LinearGradient colors={[Colors.primary,Colors.secondary]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.main} >
      <Text style={styles.header}>Pulse Care</Text>
      <Text style={{color: Colors.white,
    fontSize: 31,
    fontWeight: 'bold',}}>Login</Text> 
    </LinearGradient>
    <View style={styles.formStyle} >
      <Text style={styles.formHeading} >Login</Text>
      <View style={{marginVertical:10}} >
        <Text style={styles.textFieldLabel} >Email Id</Text>
        <TextInput placeholder='Your Email' placeholderTextColor={Colors.secondary} keyboardType='default' value={email} onChangeText={(text) => setEmail(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{marginVertical:10}} >
        <Text style={styles.textFieldLabel} >Password</Text>
        <TextInput placeholder='Your password' placeholderTextColor={Colors.secondary} keyboardType='default' secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{marginTop:25}}>
        <ThemedButton name="rick" type="twitter" borderRadius={10} width={'100%'} onPress={handleSubmit} >Login</ThemedButton>
      </View>
      <View style={styles.registerAccount}>
        <Text style={{fontSize: 16,color: Colors.primary}}>Don't have an account ?</Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerBold}>Register</Text>
          </Pressable>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textFieldStyle:{
    borderBottomColor:Colors.secondary,
    borderBottomWidth:1,
    paddingVertical:0,
    marginTop:5
  },
  textFieldLabel:{
    fontSize:16,
    color:Colors.primary
  },
  formHeading:{
    fontSize:25,
    fontWeight:'bold',
    color:Colors.primary,
    textAlign:"center"
  },
  formStyle:{
    elevation:10,
    backgroundColor:Colors.white,
    borderRadius:10,
    margin:10,
    marginTop:-30,
    paddingVertical:20,
    paddingHorizontal:15
  },
  header:{
    color:Colors.white,
    fontSize:31,
    fontWeight:'bold',
    marginTop:25
  },
  main:{
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15, 
    height:Dimensions.get('window').height*0.25,
    width:'100%',
    alignItems:"center",
    paddingTop:40
  },
  registerBold:{
    fontSize: 16,
    color: Colors.primary,
    fontWeight: "bold",
    marginLeft: 4
  },
  registerAccount:{
    flexDirection: "row",
    marginVertical: 15,
    justifyContent: "center"
  }
})