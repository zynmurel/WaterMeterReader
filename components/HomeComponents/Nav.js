import { StyleSheet, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

const Nav = () => {
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
            </View>
        </>
     );
}

const styles = StyleSheet.create({
    nav:{
        flex:1,
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
      fontSize:27,
      fontWeight:'900',
      color:'white'
    },
    text2:{
      fontSize:16,
      marginTop:-5,
      color:'white'
    },
    navText:{
    }
})
 
export default Nav;