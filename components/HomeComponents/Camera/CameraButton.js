import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, Entypo } from '@expo/vector-icons';

const CameraButton = ({title, icon, onPress, color}) => {
    const styles = StyleSheet.create({
        button:{
            height:40,
            alignItems:'center',
            flexDirection:'row',
            justifyContent:'center',
            backgroundColor:'blue',
            paddingVertical:2,
            paddingHorizontal:15,
            borderRadius:100,
            backgroundColor:'rgb(40,48,90)',
        },
        text:{
            fontWeight:'bold',
            fontSize:16,
            color:'#f1f1f1',
            marginLeft:10
        }
    })
    return ( 
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Ionicons name={icon} size={28} color={color?color:'#f1f1f1'}/>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
     );
}
 
export default CameraButton;