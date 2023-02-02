import { Text, View, StyleSheet } from "react-native";
import Body from "./HomeComponents/Body";
import Nav from "./HomeComponents/Nav";

const Home = () => {
    return ( 
        <>
         <View style={styles.home}>
            <Nav/>
            <Body/>
         </View>
        </>
     );
}

const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor:'white',
        width:"100%",
        marginTop:25,
        alignItems:'center'
    }
})
 
export default Home;