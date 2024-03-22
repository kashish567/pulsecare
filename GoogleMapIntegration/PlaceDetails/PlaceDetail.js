import { Text, ScrollView,TouchableOpacity,Platform,Linking,View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import PlaceDetailItem from './PlaceDetailItem';
import Colors from '../../Shared/Colors';
import GoogleMapView from '../MapComponents/GoogleMapView'
import {Ionicons} from '@expo/vector-icons'

export default function PlaceDetail({navigation}) {
    const params = useRoute().params;
    const [place,setPlace] = useState([]);
    useEffect(() => {
        setPlace(params.place)
    },[]);

    const onDirectionClick=()=>{
        const url=Platform.select({
          ios:"maps:"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
          android:"geo:"+place.geometry.location.lat + "," + place.geometry.location.lng + "?q=" + place.vicinity,
        });
    
        Linking.openURL(url)
      }

  return (
    <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding:20,backgroundColor: Colors.white }}>
                    <PlaceDetailItem place={place} onDirectionClick={() => onDirectionClick()} />
                </View>
                <View style={{backgroundColor: Colors.white}} >
                <GoogleMapView placeList={[place]} />
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.primary,
                            padding: 15,
                            alignContent: "center",
                            alignItem: "center",
                            margin: 8,
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 50,
                            paddingBottom: 15,
                            marginTop:15
                        }}
                        onPress={() => onDirectionClick()}
                    >
                        <Ionicons name="navigate-circle-outline"
                            size={30} color="white" />

                        <Text
                            style={{
                                fontFamily: "raleway",
                                textAlign: "center",
                                color: Colors.white
                            }}
                        >
                            Get Direction on Google Map
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
  )
}