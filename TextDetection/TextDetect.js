import { View, Text,StyleSheet, TouchableOpacity,Image, ScrollView,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import HeaderMain from '../Components/MainHomeComponentsScreens/HeaderMain'
import { Entypo } from '@expo/vector-icons';
import Colors from '../Shared/Colors'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TextDetect({navigation}) {
    const [imageUri,setImageUri] = useState(null)
    const [texts,setTexts] = useState([])
    const [isLoading, setIsLoading] = useState(false); // State variable for loading indicator

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
            setIsLoading(true); 
            if(!imageUri){
                alert('Please Select a Image !');
                return
            }

            const apiKeyText = "AIzaSyC4_6ryHoUz1ONGGhUZNtuqj2d_HfgLVWs";
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
            setIsLoading(false);
        }catch(error){
            setIsLoading(false); 
            console.log("Error During analyzing the Image"+error);
        }
    }

  return (
    <ScrollView>
        <HeaderMain navigation={navigation}/>
<ScrollView>
    <View style={styles.container} >
    <Text style={styles.title}>Detect Text</Text>
      <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Entypo name="folder-images" size={50} color={Colors.white} />
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto} style={styles.button}>
        <FontAwesome name="camera-retro" size={50} color={Colors.white} />
      </TouchableOpacity>
      </View>

      {imageUri && (
        <Image source={{uri:imageUri}} style={styles.imageStyle} />
      )}

      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.text} >Analyze Image</Text>
      </TouchableOpacity>
      {isLoading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </View>
                    ) : (
            <View style={{padding:12,backgroundColor:Colors.primary,borderRadius:15,marginTop:10}}>  
                <Text style={styles.textPara} >
                    Image Contains the following texts : 
                </Text>
                {
                    texts.map((texts) => (
                        <Text key={texts.mid} style={styles.outputText} >
                            {texts.description}
                            {console.log(texts.description)}
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
        marginBottom:0,
        marginTop:20
    },
    imageStyle:{
        width:250,
        height:250,
        borderRadius:15,
        marginTop:15
    },
    button:{
        backgroundColor:Colors.primary,
        padding:20,
        marginBottom:10,
        margin:20,
        borderRadius:10
    },  
    text:{
        fontSize:20,
        color:Colors.white,
        fontWeight:'bold'
    },
    textPara:{
        fontSize:21,
        fontWeight:'bold',
        marginTop:25,
        marginBottom:15,
        color:Colors.white
    },
    outputText:{
        fontSize:18,
        marginBottom:15,
        color:Colors.white
    }
})