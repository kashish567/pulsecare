import { View, Image ,StyleSheet, TextInput, Dimensions} from 'react-native'
import React from 'react'
import Colors from '../../Shared/Colors'

export default function Header() {
  return (
    <View style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly',alignItems:'center',marginTop:Dimensions.get('screen').height*0.03}}>
      <Image style={styles.logo} source={require('../../assets/favicon.png')} />
      <View>
        <TextInput placeholder='Search' style={styles.search} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo:{
    width:50,
    height:50
  },

  search:{
    borderWidth:2,
    padding:4,
    borderColor:Colors.black,
    borderRadius:10,
    paddingLeft:15,
    width:Dimensions.get('screen').width*0.7,
  }
})
