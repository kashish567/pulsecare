import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import Colors from '../../Shared/Colors';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export default function DoctorList() {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getAllDoctors = async () => {
    try {
      const response = await axios.get('/appointment/doctors');
      const fetchedDoctors = response.data.doctors;
      setDoctors(fetchedDoctors);
      console.log("Fetched doctors:", fetchedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.last_name.toLowerCase().includes(searchQuery.toLowerCase())  

  );

  return (
    <ScrollView>
            <Text style={{ fontSize: 20, marginBottom: 15, marginTop: 10, fontWeight: 'bold' }}>Book Instantly</Text>
      <View style={{display:"flex",marginTop:5,flexDirection:'row',marginBottom: 20,padding:10,gap:5,elevation:0.7,alignItems:'center',backgroundColor:Colors.white,borderRadius:7}} >
                <FontAwesome name="search" size={24} color={Colors.black} />
                <TextInput placeholder=' Search Doctors' style={{backgroundColor:Colors.white,width:"80%"}}  
                  value={searchQuery}
                  onChangeText={text => setSearchQuery(text)}
                />
            </View>
      <FlatList
        data={filteredDoctors}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Appointment", { doctor_id: item._id })}>
            <View style={styles.container}>
              <Image source={{ uri: item.profile_picture }} style={styles.imageStyle} />
              <View style={{ display: 'flex', gap: 5 }}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{item.first_name} {item.last_name}</Text>
                <Text style={{ fontSize: 16, color: Colors.grey, display:"flex",flex:1, flexDirection:'' }}>{item.specialization}</Text>
                <Text style={{ fontSize: 16, color: Colors.grey }}>Education : {item.education}</Text>
                <Text style={{ fontSize: 15, backgroundColor: Colors.primary, color: Colors.white, padding: 7, borderRadius: 5 }}>Book Appointment</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
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
  }
});
