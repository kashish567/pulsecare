import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Pressable, Dimensions, ScrollView } from 'react-native';
import Axios from 'axios'; 
import Colors from '../Shared/Colors';
import Toast from 'react-native-toast-message';
import { Calendar } from 'react-native-calendars';
import HeaderMain from '../Components/MainHomeComponentsScreens/HeaderMain';
import { AuthContext } from '../Context/userLocationContext';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Appoinment({ navigation,route }) {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [selectedDateSlot, setselectedDateSlot] = useState(null);
    const [selected, setSelected] = useState('');
    const { doctor_id } = route.params;
    const { doctor } = route.params;
    const [state] = useContext(AuthContext);
    console.log("Doctor ID",doctor_id)

    const handleSelectTimeSlot = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    const handleBookAppointment = async () => {
      
        try {
          console.log(selectedTimeSlot.time);
          console.log(selected);
          console.log(state.user._id);
          console.log(doctor_id);
            const response = await Axios.post('/appointment/book', {
                patient_id: state.user._id,
                doctor_id: doctor_id,
                date: selected,
                time: selectedTimeSlot.time,
            },{
              headers:{
                authorization: `${state.token}`
              }
            });
            console.log(response.data.message)
            console.log('Appointment booked:', response.data);

            Toast.show({
                type:'success',
                text1: 'Appointment Initiated and waiting for approval from doctor',
            })
        } catch (error) {
            console.error('Error booking appointment:', error.message);
        }
    };

    const timeSlots = [
        { time: '9:00 AM' },
        { time: '10:00 AM' },
        { time: '11:00 AM' },
        { time: '12:00 AM' },
    ];

    return (
        <ScrollView>
          <View style={{ justifyContent: 'center' }}>
        <HeaderMain navigation={navigation} />
            <View>
            <View style={styles.formStyle}>
              <View style={{alignItems:'center',margin:7}} >
                <Image source={{ uri: doctor.profile_picture }} style={{width: 145,height: 145,borderRadius: 100,marginBottom:10,borderColor: Colors.primary, borderWidth: 4}} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ width: 4, height: '100%', backgroundColor: Colors.primary, marginRight:10}} />
  <View>
    <Text style={{ fontSize: 22}}>
      <MaterialCommunityIcons name="account-circle" size={24} color={Colors.primary} /> {" "}
      {doctor.first_name} {doctor.last_name}
    </Text>
    <Text style={{ fontSize: 19, color: Colors.black, marginTop: 5 }}>
      <FontAwesome5 name="briefcase-medical" size={20} color={Colors.primary} /> {"  "}
      {doctor.specialization}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
      <FontAwesome6 name="graduation-cap" size={20} color={Colors.primary} /> {"  "}
      {doctor.education}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
      <MaterialCommunityIcons name="file-certificate" size={24} color={Colors.primary} /> {"  "}
      {doctor.certifications}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
      <FontAwesome6 name="language" size={20} color={Colors.primary} /> {"  "}
      {doctor.languages_spoken}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
      <FontAwesome5 name="trophy" size={20} color={Colors.primary} /> {"  "}
      {doctor.medical_achievements}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
    <AntDesign name="star" size={20} color={Colors.primary} /> {"  "}
      {doctor.average_rating}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
    <AntDesign name="clockcircle" size={20} color={Colors.primary} /> {"  "}
      {doctor.availability}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
    <FontAwesome6 name="money-bill" size={20} color={Colors.primary} /> {"  "}
      ₹ {doctor.consultation_fee}
    </Text>
    <Text style={{ fontSize: 17, color: Colors.grey, marginTop: 5 }}>
    <FontAwesome name="calendar" size={24} color={Colors.primary} /> {"  "}
      {doctor.years_of_experience} of Experience
    </Text>
  </View>
</View>

              <Text style={{ fontSize: 25, marginBottom: 15, marginTop: 30, fontWeight: 'bold',color:Colors.primary }}><AntDesign name="rightcircle" size={24} color={Colors.primary} /> Book Now</Text>

            <Calendar onDayPress={day => { setSelected(day.dateString);}}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      
    />   
        <View style={{display:"flex",flexDirection:'row', justifyContent:'space-evenly',marginTop:10}} >

<FlatList
                data={timeSlots}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectTimeSlot(item)}>
                        <Text style={[styles.timeSlot, { backgroundColor: selectedTimeSlot && selectedTimeSlot.time === item.time ? Colors.primary : 'transparent' }]}>
                            {item.time}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.time.toString()}
            />
        </View>

        <View style={styles.registerAccount}>
          <Pressable onPress={handleBookAppointment}>
            <Text style={styles.registerBold}>Book Appoinment</Text>
          </Pressable>
        </View>
      </View>
        </View>
        </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    imageStyle: {
        width: 120,
        height: 120,
        borderRadius: 15,
    },
    container: {
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    timeSlot: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 5,
        marginBottom: 10,
        marginTop:10,
        marginLeft:10
    },
    bookButton: {
        fontSize: 18,
        backgroundColor: Colors.primary,
        color: Colors.white,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
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
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 50,
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
        color: Colors.white,
        fontWeight: 'bold',
        marginLeft: 4,
        backgroundColor:Colors.primary,
        padding:10,
        borderRadius:10
      },
      registerAccount: {
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'center',
      },
});