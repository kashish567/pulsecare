import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../Context/userLocationContext';
import Colors from '../Shared/Colors';
import Toast from 'react-native-toast-message';

export default function AppoinmentsFetched({ navigation }) {
    const [appointments, setMysetAppoinments] = useState([]);
    const [state] = useContext(AuthContext);
    const { user } = state;

    const getMyAppoinments = async () => {
        try {
            if (user.role === 'patient') {
                const { data } = await axios.get(`/appointment/patient/${user._id}/appointments`);
                setMysetAppoinments(data.appointments);
            }
            if (user.role === 'doctor') {
                const { data } = await axios.get(`/appointment/doctor/${user._id}/appointments`);
                setMysetAppoinments(data.appointments);
            }
        } catch (error) {
            console.error("Error fetching appoinment:", error);
        }
    }

    useEffect(() => {
        getMyAppoinments();
    }, []);

    const handelApprove = async (id) => {
        try {
            const { data } = await axios.put(`/appointment/${id}/update-status`);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handelPay = async (item) => {
        const fee = item.consultation_fee;
        const id = item._id;

        try {
            const url = `https://stripe-payment-mern.vercel.app/${fee}`;
            const supported = await Linking.canOpenURL(url);

            Toast.show({
                type: 'success',
                text1: 'Processing',
            });

            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error("Don't know how to open URI: ");
            }

            const data = await axios.post(`/appointment/handle-payments`, {
                id: item._id,
            });

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ margin: 20, marginTop: 30 }}>
            <ScrollView>
                <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 10, fontWeight: 'bold' }}>My Appoinments</Text>
                <FlatList
                    data={appointments}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Image source={{ uri: user.role === 'patient' ? item.doctorimage : item.patientimage }} style={styles.imageStyle} />
                            <View style={{ display: 'flex', gap: 3 }}>
                                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{user.role === 'patient' ? item.doctorname : item.patientname}</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.time}</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.date}</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Fees : ₹ {item.consultation_fee}</Text>
                                {user.role === 'patient' ? (
                                    <TouchableOpacity onPress={() => handelPay(item)}>
                                        <Text style={[styles.button, { backgroundColor: item.status === 'approved' ? Colors.primary : Colors.warning }]}>
                                            {item.status === 'approved' ? 'Complete Payment' : 'Pending'}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => handelApprove(item._id)}>
                                        <Text style={[styles.button, { backgroundColor: item.status === 'approved' ? Colors.primary : Colors.warning }]}>
                                            {item.status === 'approved' ? 'Payment Pending' : 'Pending'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                <Text style={[styles.button, { backgroundColor: Colors.success }]} onPress={() => navigation.navigate('Feedback', { appointmentId: item._id })}>Feedback</Text>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 140,
        height: 175,
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
    button: {
        fontSize: 15,
        color: Colors.white,
        padding: 7,
        borderRadius: 5,
        textAlign: 'center'
    }
});
