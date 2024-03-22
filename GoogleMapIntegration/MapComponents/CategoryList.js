import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'; // Import Image from 'react-native'
import React from 'react';
import Colors from '../../Shared/Colors';

export default function CategoryList({setSelectedCategory}) {
    const categoryList = [
        {
            id: 1,
            name: 'Hospitals',
            value: 'hospital',
            icon: require('../../assets/categoryIcons/hospital.png')
        },
        {
            id: 2,
            name: 'Dentists',
            value: 'dentist',
            icon: require('../../assets/categoryIcons/dentist.png')
        },
        {
            id: 3,
            name: 'Pharmacy',
            value: 'pharmacy',
            icon: require('../../assets/categoryIcons/pharmacy.png')
        },
        {
            id: 4,
            name: 'Doctors',
            value: 'doctor',
            icon: require('../../assets/categoryIcons/doctor.png')
        },
    ];
    return (
        <View style={{ marginTop: 5,padding:15 }}>
            <Text style={{ fontSize: 20}}>Wide Categories</Text>
            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 5 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedCategory(item.value)}  >
                        <View style={{
                            alignItems: 'center',
                            marginRight: 15,
                            marginTop:15,
                            width: 90,
                            height: 90,
                            justifyContent: 'center',
                            borderRadius: 15,
                            backgroundColor: Colors.primary,
                        }}>
                            <Image source={item.icon}
                                style={{ width: 40, height: 40 }}
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
