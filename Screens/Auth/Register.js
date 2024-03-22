import { View, Text,StyleSheet, Dimensions, TextInput, Pressable,KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Shared/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemedButton } from 'react-native-really-awesome-button'
import Toast from 'react-native-toast-message';
import axios from 'axios'

export default function Register({navigation}) {

  const [first_name,setfirstName] = useState("");
  const [last_name,setlastName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async () => {
    try{
      if(!first_name || !last_name || !email || !password){
        Toast.show({
          type: 'error',
          text1: 'All Fields are Required!',
        });
        return
      }

      const {data} = await axios.post('/auth/signup/patient',{
        first_name,last_name,email,password
      });

      Toast.show({
        type: 'success',
        text1: data?.message,
      });

      navigation.navigate("Otp")

    }catch(error){
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }

  return (
    <KeyboardAvoidingView behavior=''>
    <LinearGradient colors={[Colors.primary,Colors.secondary]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.main} >
      <Text style={styles.header}>Team Mark</Text>
    </LinearGradient>
    <View style={styles.formStyle} >
      <Text style={styles.formHeading} >Register</Text>
      <View style={{marginVertical:10}} >
        <Text style={styles.textFieldLabel} >First Name</Text>
        <TextInput placeholder='Your first name' placeholderTextColor={Colors.primary} keyboardType='default' value={first_name} onChangeText={(text) => setfirstName(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{marginVertical:10}} >
        <Text style={styles.textFieldLabel} >Last Name</Text>
        <TextInput placeholder='Your last name' placeholderTextColor={Colors.primary} keyboardType='default' value={last_name} onChangeText={(text) => setlastName(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{marginVertical:10}} >
        <Text style={styles.textFieldLabel} >Email Id</Text>
        <TextInput placeholder='Your Email Id' placeholderTextColor={Colors.primary} keyboardType='default' value={email} onChangeText={(text) => setEmail(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{marginVertical:10}} >
        <Text style={styles.textFieldLabel} >Password</Text>
        <TextInput placeholder='Your password' placeholderTextColor={Colors.primary} keyboardType='default' secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{marginTop:25}}>
        <ThemedButton name="rick" type="secondary" onPress={handleSubmit} borderRadius={10} width={'100%'} >
          Register
        </ThemedButton>
      </View>
      <View style={styles.registerAccount}>
        <Text style={{fontSize: 16,color: Colors.primary}}>Already have an account ?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerBold}>Login</Text>
          </Pressable>
      </View>
    </View>
    </KeyboardAvoidingView>
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
    color:Colors.secondary
  },
  formHeading:{
    fontSize:19,
    fontWeight:'bold',
    color:Colors.secondary,
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