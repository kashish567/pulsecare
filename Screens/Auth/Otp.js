import { View, Text,StyleSheet, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-toast-message';
import axios from 'axios'
import { OtpInput } from "react-native-otp-entry";
import { ThemedButton } from 'react-native-really-awesome-button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../../Shared/Colors'

export default function Register({navigation}) {

  const [enteredOTP,setenteredOTP] = useState("");

  const handleSubmit = async () => {
    try{
    //   if(!enteredOTP){
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Please Enter all fields !',
    //     });
    //     return
    //   }

      const {data} = await axios.post('https://doctor-appointment-api-m5wm.onrender.com/auth/verify-otp/patient',{
        enteredOTP
      });

      Toast.show({
        type: 'success',
        text1: data?.message,
      });

      navigation.navigate("Home")

    }catch(error){
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  }

  return (
      <SafeAreaView>
      <LinearGradient colors={[Colors.primary,Colors.secondary]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.main} >
      <Text style={styles.header}>Team Mark</Text>
    </LinearGradient>
    <View style={styles.formStyle} >
      <Text style={styles.formHeading} >Otp Verification</Text>
      <View style={{marginVertical:10}} >
      <OtpInput
          numberOfDigits={6}
          focusColor="green"
          focusStickBlinkingDuration={400}
          value={enteredOTP} onChangeText={(text) => setenteredOTP(text)}
        />
      </View>
      <View style={{marginTop:25}}>
        <ThemedButton name="rick" type="secondary" onPress={handleSubmit} borderRadius={10} width={'100%'} >
          Submit
        </ThemedButton>
      </View>
      <View style={styles.registerAccount}>
        <Text style={{fontSize: 16,color: Colors.primary}}>Didn't received OTP ?</Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerBold}>Resend</Text>
          </Pressable>
      </View>
    </View>
      </SafeAreaView>
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
    textAlign:"center",
    marginBottom:15
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