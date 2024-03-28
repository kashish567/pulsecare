import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../Shared/Colors';
import { ThemedButton } from 'react-native-really-awesome-button';
import axios from 'axios'; 
import Toast from 'react-native-toast-message';

export default function Feedback({ navigation, route }) {
  const [rating, setRating] = useState(3);
  const { appointmentId } = route.params;

  console.log(appointmentId);

  // const giveFeedback = async () => {
  //   try {
  //     const { data } = await axios.post(`/appointment/appointment/${appointmentId}/rating`, {
  //       rating: rating,
  //     });
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Feedback submitted successfully',
  //     })
  //     console.log('Feedback submitted successfully:', data);
  //   } catch (error) {
  //     console.log('Error submitting feedback:', error);
  //   }
  // };

  const notiPress = () => {
    Toast.show({
      type: 'success',
      text1: 'Feedback submitted successfully',
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.formStyle}>
        <Text style={styles.formHeading}>Feedback</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.label}>Rate your experience:</Text>
          <View style={styles.radioGroup}>
            {[1, 2, 3, 4, 5].map((value) => (
              <View key={value} style={styles.radioButton}>
                <Text style={styles.ratingText}>{value}</Text>
                <RadioButton
                  value={value}
                  status={rating === value ? 'checked' : 'unchecked'}
                  onPress={() => setRating(value)}
                  color={Colors.primary}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <ThemedButton name="rick" type="twitter" borderRadius={10} width={'100%'} onPress={notiPress}>
            Submit
          </ThemedButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formStyle: {
    elevation: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '80%',
  },
  formHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
