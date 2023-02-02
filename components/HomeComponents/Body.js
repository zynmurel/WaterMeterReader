import { StyleSheet, View, Text } from "react-native";

const Body = () => {
    const countries = ["Egypt", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland", "Canada", "Australia", "Ireland"]
    return ( 
        <>
            <View style={styles.body}>
            </View>
        </>
     );
}

const styles = StyleSheet.create({
    body:{
        flex:8,
        width:'100%'
    },
})
 
export default Body;