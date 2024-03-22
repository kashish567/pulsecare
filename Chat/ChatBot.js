import { View, Text,StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import HeaderMain from '../Components/MainHomeComponentsScreens/HeaderMain';
import axios from 'axios';
import { isSpeakingAsync, speak,stop} from 'expo-speech';
import Colors from '../Shared/Colors';
import ChatBubble from './ChatBubble';
import { Entypo } from '@expo/vector-icons';

const API_KEY_CHAT = "AIzaSyCgvi2vA1y21gNKetcVJKjvWhHUaSAh8I0";

export default function ChatBot({navigation}) {
  const [chat,setChat] = useState([])
  const [userInput,setUserInput] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [isSpeaking,setIsSpeaking] = useState(false)

  const handleUserInput = async () => {
    let updatedChat = [
      ...chat,
      {
        role:"user",
        parts:[{text:userInput}]
      }
    ]
    setLoading(true)
    try{
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY_CHAT}`,{
        contents:updatedChat
      })
      console.log("Gemini GOD",response.data)
      const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if(modelResponse){
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role:"model",
            parts:[{text:modelResponse}]
          }
        ];

        setChat(updatedChatWithModel);
        setUserInput("");
      }
    }catch(error){
      console.log(error.response,"Gemini Error")
      setError("error occurred")
    }finally{
      setLoading(false)
    }
  };

  const handleSpeech = async(text) => {
    if(isSpeaking){
      stop();
      setIsSpeaking(false)
    }else{
      if(!(await isSpeakingAsync())){
        speak(text);
        setIsSpeaking(true)
      }
    }
  };

  const renderChatItem = ({item}) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    /> 
  )


  return (
    <View style={{flex:1,backgroundColor:Colors.white}}>
      <HeaderMain navigation={navigation}/>
      <View style={styles.container} >
        <FlatList
          data={chat}
          renderItem={renderChatItem}
          keyExtractor={(item,index) => index.toString()}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.inputConatiner} >
          <TextInput style={styles.input} placeholder='Ask anything ...' placeholderTextColor={Colors.secondary} value={userInput} onChangeText={setUserInput} />
          <TouchableOpacity style={styles.button} onPress={handleUserInput} >
            <Text style={styles.buttonText} >
              <Entypo name="arrow-up" size={30} color="white"  />
            </Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator style={styles.loading} color={Colors.primary} />}
        {error && <Text style={styles.error} >{error}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingLeft:16,
    paddingRight:16,
    backgroundColor:Colors.white
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:20,
    marginTop:40,
    textAlign:'center'
  },
  chatContainer:{
    flexGrow:1,
    justifyContent:"flex-end",
  },
  inputConatiner:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    marginBottom:10
  },
  input:{
    flex:1,
    height:50,
    marginRight:10,
    padding:8,
    borderColor:Colors.secondary,
    borderWidth:1,
    borderRadius:10,
    color:Colors.black,
    backgroundColor:Colors.white
  },
  button:{
    padding:9,
    backgroundColor:Colors.primary,
    borderRadius:25,
    marginRight:5
  },
  buttonText:{
    color:Colors.white,
    textAlign:'center',
  },
  loading:{
    marginTop:10
  },
  error:{
    color:"red",
    marginTop:10
  }
})
