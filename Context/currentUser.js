import axios from "axios";
import { createContext, useEffect, useState } from "react";

const CurrentUserContext = createContext()

const CurrentUserProvider = ({children}) => {

const [currentUser,setCurrentUser] = useState([])

const getCurrentUser = async () => {
    try{
        const {data} = await axios.get('/auth/current-user')
        setCurrentUser(data?.user)
    }catch(error){
        console.log(error)
    }
}

useEffect(() => {
    getCurrentUser()
},[])

return(
    <CurrentUserContext.Provider value={[currentUser,setCurrentUser]}>
        {children}
    </CurrentUserContext.Provider>
)}

export {CurrentUserContext,CurrentUserProvider}