import { View, Text, FlatList, Image,StyleSheet } from 'react-native'
import React from 'react'

export default function Slider() {
    const sliderData = [
        {
            id: 1,
            name: 'Hospitals',
            value: 'hospital',
            icon: require('../../assets/typesCategory/banner1.jpg')
        },
        {
            id: 2,
            name: 'Doctors',
            value: 'doctor',
            icon: require('../../assets/typesCategory/banner2.jpg')
        },
        {
            id: 3,
            name: 'Pharmacy',
            value: 'pharmacy',
            icon: require('../../assets/typesCategory/banner3.jpg')
        },
        {
            id: 4,
            name: 'Dentists',
            value: 'dentist',
            icon: require('../../assets/typesCategory/banner2.jpg')
        },
    ];
  return (
    <View style={{marginBottom:10}}>
        <Text style={{fontSize:20,marginBottom:10,fontWeight:'bold'}} >Latest by PulseCare</Text>
        <FlatList 
            data={sliderData}  
            style={{ marginTop: 3 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index}) => (
                <View style={{marginRight:15}} > 
                    <Image source={item.icon} style={styles.imageStyle} />
                </View>
            )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    imageStyle:{
        width:300,
        height:170,
        borderRadius:20,
        objectFit:'cover'
    }
})