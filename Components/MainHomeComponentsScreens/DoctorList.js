import { View, Text, FlatList, TouchableOpacity, Image,StyleSheet } from 'react-native'; // Import Image from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Shared/Colors';
import Button, { ThemedButton } from 'react-native-really-awesome-button';
import axios from 'axios';

export default function DoctorList() {
    const doctorDemo = [
        {
            id: 1,
            name: 'Hospitals',
            value: 'hospital',
            icon: require('../../assets/bg.jpg')
        },
        {
            id: 2,
            name: 'Doctors',
            value: 'doctor',
            icon: require('../../assets/bg.jpg')
        },
        {
            id: 3,
            name: 'Pharmacy',
            value: 'pharmacy',
            icon: require('../../assets/bg.jpg')
        },
        {
            id: 4,
            name: 'Dentists',
            value: 'dentist',
            icon: require('../../assets/bg.jpg')
        },
    ];

    const [doctor,setDoctor] = useState([])

    const getAllDoctor = async () => {
        try{
            const {data} = await axios.get('/appointment/doctors');
            setDoctor(data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAllDoctor()
    },[])

  return (
    <View>
    <Text style={{ fontSize: 20,marginBottom:15,marginTop:10 }}>Book Instantly</Text>
        <FlatList
                data={doctorDemo}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Image source={item.icon} style={styles.imageStyle}/>
                        <View style={{display:'flex',gap:5}} >
                            <Text style={{fontSize:15,color: Colors.grey}} >{item.id}</Text>
                            <Text style={{fontSize:19,fontWeight:'bold'}}>{item.value}</Text>
                            <Text style={{fontSize:16,color: Colors.grey,fontWeight:'bold'}}>{item.name}</Text>
                            <TouchableOpacity>
                                <Text style={{fontSize:15,backgroundColor: Colors.primary,color: Colors.white, padding:7,borderRadius:5}}>Book Appointment</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                )}
            />
    </View>
  )
}

const styles = StyleSheet.create({
    imageStyle:{
        width:120,
        height:120,
        borderRadius:15,
    },
    container:{
        padding:10,
        backgroundColor: Colors.white,
        borderRadius:15,
        marginBottom:15,
        display:'flex',
        flexDirection:'row',
        gap:10
    }
})
