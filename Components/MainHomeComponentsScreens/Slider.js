import { View, Text, FlatList, Image,StyleSheet } from 'react-native'
import React from 'react'

export default function Slider() {
    const sliderData = [
        {
            id: 1,
            name: 'Hospitals',
            value: 'hospital',
            icon: require('../../assets/dr.webp')
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
            icon: require('../../assets/demo.jpg')
        },
        {
            id: 4,
            name: 'Dentists',
            value: 'dentist',
            icon: require('../../assets/demo1.jpg')
        },
    ];
  return (
    <View>
        <Text style={{fontSize:20,marginBottom:10}} >Best of All</Text>
        <FlatList 
            data={sliderData}  
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
        width:290,
        height:160,
        borderRadius:20,
        objectFit:'cover'
    }
})