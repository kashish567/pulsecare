import { View,Image,Text, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '../Shared/Colors'
import { ThemedButton } from 'react-native-really-awesome-button';

export default function Welcome({navigation}) {
  return (
    <LinearGradient style={{ flex:1}} colors={[Colors.primary,Colors.secondary]} >
      <View style={{flex:1,marginTop:20}}>
        <View>
          <Image source={require('../assets/welcomeAssests/doc.png')} 
            style={{
              height:100,
              width:100,
              borderRadius:15,
              position:'absolute',
              top:10,
              transform:[
                { translateX:20},
                {translateY:50},
                {rotate:'-15deg'}
              ]
            }}
          />

          <Image source={require('../assets/welcomeAssests/doc2.png')} 
            style={{
              height:125,
              width:125,
              borderRadius:15,
              position:'absolute',
              top:-30,
              left:100,
              transform:[
                { translateX:50},
                {translateY:50},
                {rotate:'-5deg'}
              ]
            }}
          />

          <Image source={require('../assets/welcomeAssests/doc1.png')} 
            style={{
              height:110,
              width:110,
              borderRadius:15,
              position:'absolute',
              top:170,
              left:-35,
              transform:[
                { translateX:50},
                {translateY:50},
                {rotate:'15deg'}
              ]
            }}
          />

          <Image source={require('../assets/welcomeAssests/doc3.png')} 
            style={{
              height:190,
              width:190,
              borderRadius:15,
              position:'absolute',
              top:110,
              left:100,
              transform:[
                { translateX:50},
                {translateY:50},
                {rotate:'-15deg'}
              ]
            }}
          />
        </View>
        <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                  <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: Colors.white
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: Colors.white
                    }}>Started</Text>

<View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: Colors.white,
                            marginVertical: 4
                        }}>Connect with each other with chatting</Text>
                        <Text style={{
                            fontSize: 16,
                            color: Colors.white,
                        }}>Calling, Enjoy Safe and private texting</Text>
                    </View>
                    <View>
                    <ThemedButton name="rick" type="secondary" borderRadius={10} width={'100%'} onPress={() => navigation.navigate('Register')} >Join Now</ThemedButton>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: Colors.white
                        }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: Colors.white,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
        </View>
      </View>
    </LinearGradient>
  )
}