import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import { Entypo } from '@expo/vector-icons';

export default function ChatBubble({role,text,onSpeech}) {
  return (
    <View style={[styles.chatItem, role == "user" ? styles.userChatItem : styles.modelChatItem]} >
        <Text style={ role == "user" ? styles.chatTextUser : styles.chatTextModel} >{text}</Text>
        {role === "model" && (
            <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon} >
                <Entypo name='sound' size={20} color={Colors.black} />
            </TouchableOpacity>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  chatItem:{
    marginBottom:10,
    padding:10,
    borderRadius:10,
    maxWidth:"70%",
    position:'relative'
  },
  userChatItem:{
    alignSelf:'flex-end',
    backgroundColor:Colors.primary,
    elevation:2
  },
  modelChatItem:{
    alignSelf:"flex-start",
    backgroundColor:Colors.white,
    elevation:3
  },
  chatTextModel:{
    fontSize:16,
    color:Colors.black
  },
  chatTextUser:{
    fontSize:16,
    color:Colors.white
  },
  speakerIcon:{
    position:'absolute',
    bottom:5,
    right:5
  }
})
