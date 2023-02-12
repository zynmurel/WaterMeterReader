import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from "react";

const SearchBar = ({searched, setSearched}) => {
    const search = (text) => {
        setSearched(text)
    }
    const styles = StyleSheet.create({
        email:{
            width:'78%',
            height:50,
            fontSize:15,
          },
          emailContainer:{
            borderWidth:1,
            borderColor:'black',
            borderRadius:5,
            width:'90%',
            height:50,
            marginTop:10,
            paddingHorizontal:10,
            fontSize:18,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start'
          },
    })
    return ( 
    <View style={{ ...styles.emailContainer, borderColor: false? 'red':'black' }}>
      <Ionicons style={{ width:26 }} name={"search"} size={22} color="#333333" />
      <TextInput
        defaultValue={searched}
        placeholder='Search ID/Name' 
        style={{ ...styles.email }}
        onChangeText={ search }
        />

      <TouchableOpacity onPress={{  }}>
      </TouchableOpacity>
    </View>
     );
}
 
export default SearchBar;