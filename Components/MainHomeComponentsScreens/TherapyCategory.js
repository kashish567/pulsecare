import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'; // Import Image from 'react-native'
import React, { useEffect, useState } from 'react';
import Colors from '../../Shared/Colors';
import axios from 'axios';

export default function TherapyCategory() {
    const categoryList = [
        {
            id: 1,
            name: 'Dental',
            value: 'hospital',
            icon: require('../../assets/typesthearpy/cat1.png')
        },
        {
            id: 2,
            name: 'Therapy',
            value: 'doctor',
            icon: require('../../assets/typesthearpy/cat2.png')
        },
        {
            id: 3,
            name: 'Skin Care',
            value: 'pharmacy',
            icon: require('../../assets/typesthearpy/cat3.png')
        },
        {
            id: 4,
            name: 'Skin Care',
            value: 'pharmacy',
            icon: require('../../assets/typesthearpy/cat3.png')
        },{
            id: 5,
            name: 'Skin Care',
            value: 'pharmacy',
            icon: require('../../assets/typesthearpy/cat3.png')
        },
        // {
        //     id: 4,
        //     name: 'Dentists',
        //     value: 'dentist',
        //     icon: require('../../assets/typesthearpy/type4.jpg')
        // },
    ];

    const [category,setCategory] = useState([])

    const getAllCategory = async () => {
        const {data} = await axios.get("")
    }

    useEffect(() => {
        getAllCategory()
    },[])
    return (
        <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 20,fontWeight:'bold' }}>Wide Categories</Text>
            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5 }}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <View style={{
                            alignItems: 'center',
                            marginRight: 15,
                            marginTop:10,
                            marginBottom:10,
                            width: 90,
                            height: 90,
                            justifyContent: 'center',
                            borderRadius: 50,
                            backgroundColor: Colors.primary,
                        }}>
                            <Image source={item.icon}
                                style={{ width: 35, height: 35 }}
                            />
                            <Text style={{ fontSize: 13,marginTop:5,color: Colors.white,fontWeight:'bold' }}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
