import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import {useNavigation} from '@react-navigation/native'

const Nav = ({setIsLogin, setOpenProfile, openProfile}) => {
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
                <TouchableOpacity style={styles.reader} onPress={()=> setOpenProfile(true)}>
                    <Ionicons name={"person"} color="rgb(12,30,50)" size={25}/>
                </TouchableOpacity>
            </View>
        </>
     );
}

const styles = StyleSheet.create({
    nav:{
        height:85,
        backgroundColor:"rgb(12,30,50)",
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        paddingTop:25,
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