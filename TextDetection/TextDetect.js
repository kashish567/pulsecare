import { View, Text,StyleSheet, TouchableOpacity,Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import LabelDetect from './LabelDetect'
import HeaderMain from '../Components/MainHomeComponentsScreens/HeaderMain'

export default function TextDetect({navigation}) {
    const [imageUri,setImageUri] = useState(null)
    const [texts,setTexts] = useState([])

    const pickImage = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            });
            if(!result.canceled){
                setImageUri(result.assets[0].uri);
            }
            console.log(result);
        }catch(error){
            console.log("Error in Picking Image :( "+error);
        }
    }

    const takePhoto = async () => {
        try{
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[4,3],
                quality:1
            });
            if(!result.canceled){
                setImageUri(result.assets[0].uri);
            }
            console.log(result);
        }catch(error){
            console.log("Error in Picking Image :( "+error);
        }
    }

    const analyzeImage = async () => {
        try{
            if(!imageUri){
                alert('Please Select a Image !');
                return
            }

            const apiKeyText = "AIzaSyCzfD3QlEuAmRY6C_WM-AQJftEUJR4dZlo";
            const apiURL = "https://vision.googleapis.com/v1/images:annotate?key="+apiKeyText;

            const readImage = await FileSystem.readAsStringAsync(imageUri,{
                encoding: FileSystem.EncodingType.Base64
            });
            
            const requestData = {
                requests:[
                    {
                        image:{
                            content: readImage,
                        },
                        features:[{
                            type:'DOCUMENT_TEXT_DETECTION', maxResults: 1
                        }]
                    }
                ]
            };

            const apiResult = await axios.post(apiURL,requestData);
            setTexts(apiResult.data.responses[0].textAnnotations);
            console.log(apiResult)
        }catch(error){
            console.log("Error During analyzing the Image"+error);
        }
    }

  return (
    <ScrollView>
        <HeaderMain navigation={navigation}/>
<ScrollView>
    <View style={styles.container} >
    <Text style={styles.title}>Detect Text</Text>
      {imageUri && (
        <Image source={{uri:imageUri}} style={styles.imageStyle} />
      )}
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.text} >Choose an Image...</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhoto} style={styles.button}>
        <Text style={styles.text} >Take Photo ...</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.text} >Analyze this Image...</Text>
      </TouchableOpacity>
      {
        texts.length>0 && (
            <View>  
                <Text style={styles.textPara} >
                    Image Contains the following texts : 
                </Text>
                {
                    texts.map((texts) => (
                        <Text key={texts.mid} style={styles.outputText} >
                            {texts.description}
                        </Text>
                    ))
                }
            </View>
        )
      }
    </View>
    </ScrollView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        marginBottom:50,
        marginTop:100
    },
    imageStyle:{
        width:300,
        height:300
    },
    button:{
        backgroundColor:"#DDDDDD",
        padding:10,
        marginBottom:10,
        marginTop:20,
        borderRadius:10
    },  
    text:{
        fontSize:20,
        fontWeight:'bold'
    },
    textPara:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:25
    },
    outputText:{
        fontSize:18,
        marginBottom:15
    }
})