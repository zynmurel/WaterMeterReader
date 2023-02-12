import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";


const ListOfBrgyPrk = ({generated, db, reloadGenerated, setReloadGenerated}) => { 
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        container:{
            width:'90%',
        },
        toread:{
            backgroundColor:'rgba(52, 53, 65, 1)',
            width:'100%',
            height:380,
            paddingHorizontal:10,
            paddingVertical:5,
            borderRadius:5
        },
        text1:{ 
            fontSize:17,
            fontWeight:'600',
            color:'rgba(89, 89, 89, 1)',
            width:'100%',
            paddingHorizontal:10,
            marginBottom:3,
        },
        onebrgyprk:{
            backgroundColor:'white',
            padding:15,
            marginBottom:2,
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.1,
                height: -0.1, },
            backgroundColor: 'white',
            borderRadius: 2,
            borderWidth:1,
            borderColor:'rgba(218, 218, 218, 1)'
        },
        onebrgyprktext:{
            fontSize:19,
            fontWeight:'bold'
        },
        onebrgyprktext2:{
            fontSize:16,
        },
        nogenerated:{
            justifyContent:'center',
            alignItems:'center',
            padding:20,
            paddingVertical:100
        },
        nogeneratedtext:{
            fontWeight:'bold',
            fontSize:30,
            textAlign:'center',
            color:'gray'
        }
    })
    const byBrgyPrk = (barangay, purok, totalConsumer, totalReaded, name, item) => {
        return (
            <TouchableOpacity 
             onPress={()=>{
                    // db.transaction(tx => {
                    //     tx.executeSql(
                    //       `DROP TABLE IF EXISTS ${name};`
                    //     );
                    //   });
                    //   setReloadGenerated(reloadGenerated?false:true)
                    console.log(item)
                    navigation.navigate("Reading", {item})
             }}>
             <LinearGradient colors={['white', 'white', '#F9F2E6']} style={styles.onebrgyprk}>
                <Text style={styles.onebrgyprktext}>{barangay}</Text>
                <Text style={styles.onebrgyprktext2}>{`Purok ${purok}`}</Text>
                <Text style={styles.onebrgyprktext2}>{`Readed : ${totalReaded}/${totalConsumer}`}</Text>

            </LinearGradient>
            </TouchableOpacity>
        )
    }
    return ( 
        <View style={styles.container}>
            <Text style={styles.text1}>
                Generated Barangay  :  {generated.length}/5
            </Text>
            
            <View style={styles.toread}>    
                {generated.length!==0 && <FlatList
                    data={generated}
                    renderItem={({item}) => {
                        return byBrgyPrk(item.barangay, item.purok, item.totalConsumer, item.totalReaded,item.name, item)
                    }}
                    keyExtractor={item => item.id}
                />}
                {
                    generated.length===0 &&
                    <View style={styles.nogenerated}>
                        <Text style={styles.nogeneratedtext}>
                            No Generated Barangay
                        </Text>
                    </View>
                }
            </View>
        </View>
     );
}
 
export default ListOfBrgyPrk;