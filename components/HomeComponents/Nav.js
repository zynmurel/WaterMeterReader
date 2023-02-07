import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

const Nav = () => {
    const navigation = useNavigation()
    const pressPerson = async() => {
         AsyncStorage.setItem("user_type","")
         AsyncStorage.setItem("user_token","")
         AsyncStorage.setItem("user_email","")
         AsyncStorage.setItem("user_id","")
          navigation.navigate("Login")
          const token = await AsyncStorage.getItem("user_token")
          console.log(token)
    }
    return ( 
        <>
            <View style={styles.nav}>
                <View style={styles.logo}>
                    <Ionicons style={{ marginTop:8 }} name={"water"} size={43} color="white" />
                    <View style={styles.navText}>
                        <Text style={styles.text1}>BALILIHAN</Text>
                        <Text style={styles.text2}>WATERWORKS</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.reader} onPress={pressPerson}>
                    <Ionicons name={"person"} color="rgb(12,30,50)" size={25}/>
                </TouchableOpacity>
            </View>
        </>
     );
}

const styles = StyleSheet.create({
    nav:{
        height:60,
        backgroundColor:"rgb(12,30,50)",
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    logo:{
        alignItems:'center',
        flexDirection:'row'
    },
    text1:{
      fontSize:25,
      fontWeight:'900',
      color:'white'
    },
    text2:{
      fontSize:14,
      marginTop:-5,
      color:'white'
    },
    navText:{
    },
    reader:{
        backgroundColor:'white',
        padding:5,
        borderRadius:30,
        marginHorizontal:20
    }
})
 
export default Nav;