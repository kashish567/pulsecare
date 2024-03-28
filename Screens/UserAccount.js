import { View, TouchableOpacity,Text,StyleSheet, Dimension,TextInput,Dimensions, Pressable, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/userLocationContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import HeaderMain from '../Components/MainHomeComponentsScreens/HeaderMain';
import { ThemedButton } from 'react-native-really-awesome-button';
import Colors from '../Shared/Colors';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function UserAccount({navigation}) {
    const [state,setState] = useContext(AuthContext);
    const {user,token} = state;

    const [first_name, setFirst_Name] = useState(user?.first_name);
    const [last_name, setLast_Name] = useState(user?.last_name);
    const [specialization,setspecialization] = useState("")
    const [years_of_experience,setyears_of_experience] = useState("")
    const [education,seteducation] = useState("")
    const [medical_achievements,setmedical_achievements] = useState("")
    const [languages_spoken,setlanguages_spoken] = useState("")
    const [consultation_fee,setconsultation_fee] = useState("")
    const [availability,setavailability] = useState("")
    const [profile_picture, setprofile_picture] = useState(user?.profile_picture || '');

    const updateUser = async () => {
      try {
        const { data } = await axios.put(
          `/auth/update-doctor/${user._id}`,
          {
            first_name,last_name,specialization,years_of_experience,education,medical_achievements,languages_spoken,consultation_fee,availability,profile_picture
          },
          {
            headers: {
              Authorization: `${token}`
            }
          }
        );
        const updatedUser = data?.updatedProfile; 
        setState(prevState => ({
          ...prevState,
          user: {
            ...prevState.user,
            first_name: updatedUser?.first_name,
            last_name: updatedUser?.last_name,
            specialization: updatedUser?.specialization,
            years_of_experience: updatedUser?.years_of_experience,
            education: updatedUser?.education,
            medical_achievements: updatedUser?.medical_achievements,
            languages_spoken: updatedUser?.languages_spoken,
            consultation_fee: updatedUser?.consultation_fee,
            availability: updatedUser?.availability,
            profile_picture: updatedUser?.profile_picture,
          }
        }));
        console.log(first_name);
        Toast.show({
          type: 'success',
          text1: 'Profile Updated Successfully'
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Profile Update Failed'
        });
      }
    };

    const updateProfilePhoto = async () => {
      try {
        const { data } = await axios.put(
          `/auth/users/${user._id}/profile-picture`,
          {
            profile_picture
          },
          {
            headers: {
              Authorization: `${token}`
            }
          }
        );
        const updatedUser = data?.updatedProfile; 
        setState(prevState => ({
          ...prevState,
          user: {
            ...prevState.user,
            first_name: updatedUser?.first_name,
            last_name: updatedUser?.last_name,
            specialization: updatedUser?.specialization,
            years_of_experience: updatedUser?.years_of_experience,
            education: updatedUser?.education,
            medical_achievements: updatedUser?.medical_achievements,
            languages_spoken: updatedUser?.languages_spoken,
            consultation_fee: updatedUser?.consultation_fee,
            availability: updatedUser?.availability,
            profile_picture: updatedUser?.profile_picture,
          }
        }));
        console.log(first_name);
        Toast.show({
          type: 'success',
          text1: 'Profile Updated Successfully'
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Profile Update Failed'
        });
      }
    };

    const pickImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setprofile_picture(result.uri);
        }
      } catch (error) {
        console.log('Error picking image:', error);
      }
    };
    
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
    <ScrollView >
      <HeaderMain navigation={navigation} />
    <View style={styles.formStyle}>
    <View style={{display:"flex",flexDirection:'row', justifyContent:'space-evenly',margin:5}} >
      <View style={{backgroundColor:Colors.primary,padding:13,borderRadius:50 }} >
          <Text style={styles.formHeading}>Update Profile</Text>
      </View>
      </View>
      <View style={{ marginTop: 25 }}>
  <ThemedButton name="rick" type="twitter" borderRadius={10} width="100%" onPress={pickImage}>Pick Image</ThemedButton>
</View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>First Name</Text>
        <TextInput placeholder="Your first name" placeholderTextColor={Colors.secondary} keyboardType="default" value={first_name} onChangeText={(text) => setFirst_Name(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Last Name</Text>
        <TextInput placeholder="Your last name" placeholderTextColor={Colors.secondary} keyboardType="default" value={last_name} onChangeText={(text) => setLast_Name(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Specialization</Text>
        <TextInput placeholder="Your Specialization" placeholderTextColor={Colors.secondary} keyboardType="default" value={specialization} onChangeText={(text) => setspecialization(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Years of experience</Text>
        <TextInput placeholder="Your Years of experience" placeholderTextColor={Colors.secondary} keyboardType="numeric" value={years_of_experience} onChangeText={(text) => setyears_of_experience(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Education</Text>
        <TextInput placeholder="Your Education" placeholderTextColor={Colors.secondary} keyboardType="default" value={education} onChangeText={(text) => seteducation(text)} style={styles.textFieldStyle} />
      </View>
      {/* <View style={{ marginTop: 25 }}>
  <ThemedButton name="rick" type="twitter" borderRadius={10} width="100%" onPress={pickImage}>Pick Image</ThemedButton>
</View> */}
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Languages Spoken</Text>
        <TextInput placeholder="Your Languages Spoken" placeholderTextColor={Colors.secondary} keyboardType="default" value={languages_spoken} onChangeText={(text) => setlanguages_spoken(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Consultation Fee</Text>
        <TextInput placeholder="Your Consultation Fee" placeholderTextColor={Colors.secondary} keyboardType="numeric" value={consultation_fee} onChangeText={(text) => setconsultation_fee(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.textFieldLabel}>Availability</Text>
        <TextInput placeholder="Your Availability" placeholderTextColor={Colors.secondary} keyboardType="default" value={availability} onChangeText={(text) => setavailability(text)} style={styles.textFieldStyle} />
      </View>
      <View style={{ marginTop: 25 }}>
        <ThemedButton name="rick" type="twitter" borderRadius={10} width="100%" onPress={updateUser} >
          Update
        </ThemedButton>
      </View>
      <View style={{ marginTop: 25 }}>
        <ThemedButton name="rick" type="pinterest" borderRadius={10} width="100%" onPress={handleLogout} >
          Logout
        </ThemedButton>
      </View>
    </View>
    </ScrollView>
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
