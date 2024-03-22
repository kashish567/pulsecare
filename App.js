import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { AuthProvider, userLocationContext } from './Context/userLocationContext';
import Toast from 'react-native-toast-message';
import MainAppNavigation from './MainAppNavigation';
import { CurrentUserProvider } from './Context/currentUser';

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
    <userLocationContext.Provider value={{location,setLocation}}>
      <AuthProvider>
        <CurrentUserProvider>
      <NavigationContainer>
        <MainAppNavigation/>
      </NavigationContainer>
      <Toast />
      </CurrentUserProvider>
      </AuthProvider>
    </userLocationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
