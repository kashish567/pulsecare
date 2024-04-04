import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'; // Import Image from 'react-native'
import React from 'react';
import Colors from '../../Shared/Colors';

export default function TherapyCategory() {
    const categoryList = [
        {
            id: 1,
            name: 'Period doubts',
            value: 'hospital',
            icon: require('../../assets/typesthearpy/cat7.png')
        },
        {
            id: 2,
            name: 'Anxiety',
            value: 'doctor',
            icon: require('../../assets/typesthearpy/cat6.png')
        },
        {
            id: 3,
            name: 'Cold / cough',
            value: 'pharmacy',
            icon: require('../../assets/typesthearpy/cat5.png')
        },
        {
            id: 4,
            name: 'Cardio Help',
            value: 'pharmacy',
            icon: require('../../assets/typesthearpy/cat4.png')
        },{
            id: 5,
            name: 'Therapies',
            value: 'pharmacy',
            icon: require('../../assets/typesthearpy/cat2.png')
        }
    ];
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
                            borderRadius: 15,
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
