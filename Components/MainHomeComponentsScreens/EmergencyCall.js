import { View, Text, FlatList, TouchableOpacity, Image, Linking } from 'react-native'; // Import Image from 'react-native'
import React from 'react';
import Colors from '../../Shared/Colors';

export default function EmergencyCall() {
    const categoryList = [
        {
            id: 1,
            name: 'Ambulance',
            value: 'ambulance',
            icon: require('../../assets/call/ambu.png'),
            phone: 'tel:108' 
        },
        {
            id: 2,
            name: 'Emergency',
            value: 'emergency',
            icon: require('../../assets/call/emer.png'),
            phone: 'tel:112'
        },
        {
            id: 3,
            name: 'Fire Help',
            value: 'fire_help',
            icon: require('../../assets/call/fire.png'),
            phone: 'tel:101'
        },
        {
            id: 4,
            name: 'Police',
            value: 'police',
            icon: require('../../assets/call/pol.png'),
            phone: 'tel:100'
        }
    ];

    const handleCall = (phoneNumber) => {
        Linking.openURL(phoneNumber);
    };

    return (
        <View style={{marginBottom: 10}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Emergency Call</Text>
            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 3 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleCall(item.phone)}>
                        <View style={{
                            alignItems: 'center',
                            marginRight: 15,
                            marginTop: 10,
                            marginBottom: 10,
                            width: 90,
                            height: 90,
                            justifyContent: 'center',
                            borderRadius: 15,
                            backgroundColor: Colors.red,
                        }}>
                            <Image source={item.icon}
                                style={{ width: 35, height: 35 }}
                            />
                            <Text style={{ fontSize: 13, marginTop: 5, color: Colors.white, fontWeight: 'bold' }}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
