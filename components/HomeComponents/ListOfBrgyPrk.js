import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';


const ListOfBrgyPrk = ({generated, db, reloadGenerated, setReloadGenerated}) => {
    console.log(generated)
    const styles = StyleSheet.create({
        container:{
            width:'90%',
        },
        toread:{
            backgroundColor:'white',
            width:'100%',
            height:380,
            padding:10,
            borderRadius:5
        },
        text1:{
            fontSize:20,
            marginHorizontal:10,
            marginBottom:10,
            fontWeight:'bold'
        },
        onebrgyprk:{
            backgroundColor:'white',
            padding:15,
            borderRadius:10,
            marginBottom:8,
            elevation: 5,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.1,
                height: -0.1, },
            backgroundColor: 'white',
            borderRadius: 10
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
    const byBrgyPrk = (barangay, purok, totalConsumer, totalReaded, name) => {
        return (
            <TouchableOpacity 
             onPress={()=>{
                    db.transaction(tx => {
                        tx.executeSql(
                          `DROP TABLE IF EXISTS ${name};`
                        );
                      });
                      setReloadGenerated(reloadGenerated?false:true)
             }}>
             <LinearGradient colors={['#FFDD98', '#FFF0D1', '#F9F2E6']} style={styles.onebrgyprk}>
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
                        return byBrgyPrk(item.barangay, item.purok, item.totalConsumer, item.totalReaded,item.name)
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