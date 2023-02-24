import { StyleSheet, View, FlatList, Text, TouchableOpacity, Button } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const ConsumerList = ({data, searched, totalConsumer, totalReaded, reloadHome, barangayName, setReloadHome, filteredConsumers, barangay, purok, areadata}) => {
    const [reload, setReload] = useState(false);
    const navigation = useNavigation()
    console.log(filteredConsumers.length)


    const styles = StyleSheet.create({
        consumerlist:{
            backgroundColor:'green',
            height:450,
            width:'96%',
            marginHorizontal:10,
            marginVertical:0,
            borderRadius:5 ,
            alignItems:'center',
            padding:5
        },
        eachConsumer:{
            backgroundColor:'white',
            width:'100%',
            paddingVertical:5,
            paddingHorizontal:10,
            justifyContent:'center',
            borderWidth:.5,
            borderColor:'#B6B6B6'
        },
        text1:{
            fontWeight:'bold',
            fontSize:20
        },
        text2:{
            marginTop:-2
        },
        toreadcontainer:{
            marginTop:10,
            width:'100%',
            paddingHorizontal:10
        },
        toreadtext:{
            paddingHorizontal:15,
            paddingVertical:5,
            fontSize:15,
            width:'auto',
            backgroundColor:'#D89700',
            color:'white',
            borderRadius:4,
            borderTopRightRadius:50,
            width:170
        },
        warn:{
            color:'gray',
            marginTop:140,
            fontSize:16,
            textAlign:'center',
        }
    })
    const eachConsumer = (item) => {
        return (
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate("ConsumerPage", {item})
        }}
        >
        <LinearGradient colors={['white', 'white', 'white']} style={styles.eachConsumer}>
            <Text style={styles.text1}>{item.consumer_id}</Text>
            <Text style={styles.text2}>{item.first_name} {item.middle_name} {item.last_name}</Text>
        </LinearGradient>
        </TouchableOpacity>
        )
    }
    return ( 
        <>
        <View style={styles.toreadcontainer}>
        <Text style={styles.toreadtext}>Read : {totalConsumer - data.length} / {totalConsumer}</Text>
        </View>
        <LinearGradient colors={['white', '#DADADA']} style={styles.consumerlist}>
            {data.length!==0 &&
            <FlatList
                    style={{ width:'100%', height:'100%' }}
                    data={data}
                    renderItem={({item}) => {
                        return eachConsumer(item)
                    }}
                    keyExtractor={item => item.consumer_id}
                />}
            {data.length===0 && searched!=="" &&
            <>
            <Text style={styles.warn}>No consumer ID/Name includes this text</Text>
            </>
            }
            {data.length===0 && searched==="" &&
            <>
            <Text style={styles.warn}>No Consumer to Read in {barangay} Purok {purok}</Text>
            <TouchableOpacity style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:5, margin:20, marginHorizontal:30 }}
            onPress={()=> 
                navigation.navigate("ReadConsumers", { areadata})}
                >
                <LinearGradient colors={['#3A4994', '#4B589E', '#4B589E']} style={{ width:'100%', borderRadius:20, justifyContent:'center',flexDirection:'row', alignItems:'center',
            elevation: 1,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.1,
                height: -0.1, },
                borderWidth:1,
                borderColor:'#9FA5C3' }}>
                                    <Text style={{  color:'white', fontWeight:'bold', fontSize:16, marginHorizontal:40, textAlign:'center', marginVertical:10 }}>
                                        Read Consumer/s
                                    </Text>
                                    <Ionicons name="arrow-forward" color={"#9FA5C3"} size={25} style={{ marginTop:3 }}  />
                                </LinearGradient>
            </TouchableOpacity>
            </>
            }
        </LinearGradient>
        </>
     );
}
 
export default ConsumerList;