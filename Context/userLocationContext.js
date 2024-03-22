import {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

export const userLocationContext = createContext(null);

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [state,setState] = useState({
        user:null,
        token:""
    });

    axios.defaults.baseURL="https://doctor-appointment-api-m5wm.onrender.com"

    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({...state,user:loginData?.user,token:loginData?.token})
        };

        loadLocalStorageData();

    },[]);
    return (
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthProvider};

