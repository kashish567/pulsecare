import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Axios from 'axios'; // Import Axios
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Colors from '../../Shared/Colors';

// Define TimeSlots screen
export default function TimeSlotsScreen({ navigation }) {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [patientId, setPatientId] = useState(''); // Assuming you have a way to retrieve the patient ID
    const doctorId = 'YOUR_DOCTOR_ID'; // You can replace this with the actual doctor ID
    
    // Function to handle selecting time slot
    const handleSelectTimeSlot = (timeSlot) => {
        setSelectedTimeSlot(timeSlot);
    };

    // Function to handle booking appointment
    const handleBookAppointment = async () => {
        try {
            // Make a POST request to your backend API to book the appointment
            const response = await Axios.post('https://doctor-appointment-api-m5wm.onrender.com/appointment/book', {
                patient_id: patientId,
                doctor_id: doctorId,
                date: selectedTimeSlot.date,
                time: selectedTimeSlot.time,
            });
            
            // Handle the response from the backend if needed
            console.log('Appointment booked:', response.data);
        } catch (error) {
            // Handle error if the request fails
            console.error('Error booking appointment:', error);
        }
    };

    // Dummy time slots data
    const timeSlots = [
        { id: 1, date: '2024-03-23', time: '9:00 AM' },
        { id: 2, date: '2024-03-23', time: '10:00 AM' },
        { id: 3, date: '2024-03-24', time: '11:00 AM' },
        // Add more time slots as needed
    ];

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 15 }}>Select a Time Slot</Text>
            <FlatList
                data={timeSlots}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelectTimeSlot(item)}>
                        <Text style={[styles.timeSlot, { backgroundColor: selectedTimeSlot === item ? Colors.primary : 'transparent' }]}>
                            {item.date} - {item.time}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity onPress={handleBookAppointment}>
                <Text style={styles.bookButton}>Book Appointment</Text>
            </TouchableOpacity>
        </View>
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
        marginBottom: 10
    },
    bookButton: {
        fontSize: 18,
        backgroundColor: Colors.primary,
        color: Colors.white,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    }
});
