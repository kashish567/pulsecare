import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Pressable, KeyboardAvoidingView, ScrollView,TouchableOpacity } from 'react-native';
import Colors from '../../../Shared/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedButton } from 'react-native-really-awesome-button';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export default function DoctorRegister({ navigation }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [enteredOTP, setEnteredOTP] = useState('');

  const handleSubmit = async () => {
    try {
      if (!first_name || !last_name || !email || !password) {
        Toast.show({
          type: 'error',
          text1: 'All Fields are Required!',
        });
        return;
      }

      const { data } = await axios.post('/auth/signup/doctor', {
        first_name,
        last_name,
        email,
        password,
      });

      Toast.show({
        type: 'success',
        text1: data?.message,
      });

      setShowOTPField(true);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  };

  const verifyOtp = async () => {
    try {
      if (!first_name || !last_name || !email || !password || !enteredOTP) {
        Toast.show({
          type: 'error',
          text1: 'All Fields are Required!',
        });
        return;
      }

      const { data } = await axios.post('/auth/verify-otp/doctor', {
        first_name,
        last_name,
        email,
        password,
        enteredOTP,
      });

      Toast.show({
        type: 'success',
        text1: data?.message,
      });

      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: error?.message,
      });
    }
  };

  return (
    <ScrollView>
    <KeyboardAvoidingView behavior="">
      <LinearGradient colors={[Colors.primary, Colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.main}>
        <Text style={styles.header}>Pulse Care</Text>
        <Text style={{color: Colors.white,
    fontSize: 31,
    fontWeight: 'bold',}}>Doctor Registration</Text> 
      </LinearGradient>
      <View style={styles.formStyle}>
      <View style={{display:"flex",flexDirection:'row', justifyContent:'space-between',margin:5}} >
        <View style={{backgroundColor:Colors.primary,padding:10,borderRadius:50 }} >
        <TouchableOpacity onPress={() => navigation.navigate('Register')} >
          <Text style={styles.formHeading}>User Register</Text>
        </TouchableOpacity>
        </View>
        <View style={{backgroundColor:Colors.primary,padding:10,borderRadius:50 }} >
            <Text style={styles.formHeading}>Doctor Register</Text>
        </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textFieldLabel}>First Name</Text>
          <TextInput placeholder="Your first name" placeholderTextColor={Colors.secondary} keyboardType="default" value={first_name} onChangeText={(text) => setFirstName(text)} style={styles.textFieldStyle} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textFieldLabel}>Last Name</Text>
          <TextInput placeholder="Your last name" placeholderTextColor={Colors.secondary} keyboardType="default" value={last_name} onChangeText={(text) => setLastName(text)} style={styles.textFieldStyle} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textFieldLabel}>Email Id</Text>
          <TextInput placeholder="Your Email Id" placeholderTextColor={Colors.secondary} keyboardType="default" value={email} onChangeText={(text) => setEmail(text)} style={styles.textFieldStyle} />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.textFieldLabel}>Password</Text>
          <TextInput placeholder="Your password" placeholderTextColor={Colors.secondary} keyboardType="default" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} style={styles.textFieldStyle} />
        </View>
        {showOTPField && (
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.textFieldLabel}>OTP</Text>
            <TextInput placeholder="Enter the OTP Received" placeholderTextColor={Colors.secondary} keyboardType="number-pad" value={enteredOTP} onChangeText={(text) => setEnteredOTP(text)} style={styles.textFieldStyle} />
          </View>
        )}
        <View style={{ marginTop: 25 }}>
          <ThemedButton name="rick" type="twitter" onPress={showOTPField ? verifyOtp : handleSubmit} borderRadius={10} width="100%">
            {showOTPField ? 'Verify OTP' : 'Register'}
          </ThemedButton>
        </View>
        <View style={styles.registerAccount}>
          <Text style={{ fontSize: 16, color: Colors.primary }}>Already have an account ?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.registerBold}>Login</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
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
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  formStyle: {
    elevation: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 10,
    marginTop: -15,
    paddingVertical: 20,
    paddingHorizontal: 15,
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
