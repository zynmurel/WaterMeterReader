import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ConsumerList = ({data, searched, totalConsumer, totalReaded}) => {
    const navigation = useNavigation()
    const [filteredConsumers, setFilteredConsumers] = useState(data)
    useEffect(()=>{
        const sample = data.filter((dt)=>{
            const name = `${dt.first_name} ${dt.last_name} ${dt.middle_name} ${dt.consumer_id}`.toLowerCase() 
            if(name.toLowerCase().includes(searched.toLowerCase())){
                return dt
            }
    })
        setFilteredConsumers(sample)
    },[searched])


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
            backgroundColor:'#00AE00',
            color:'white',
            borderRadius:4,
            borderTopRightRadius:50,
            width:170
        },
        warn:{
            color:'gray',
            marginTop:200,
            fontSize:15
        }
    })
    const eachConsumer = (item) => {
        return (
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate("ConsumerPage", {item})
            console.log(item)
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
        <Text style={styles.toreadtext}>Readed : {totalReaded} / {totalConsumer}</Text>
        </View>
        <LinearGradient colors={['white', '#DADADA']} style={styles.consumerlist}>
            {filteredConsumers.length!==0 &&
            <FlatList
                    style={{ width:'100%', height:'100%' }}
                    data={filteredConsumers.sort(function(a, b){return a.consumer_id - b.consumer_id})}
                    renderItem={({item}) => {
                        return eachConsumer(item)
                    }}
                    keyExtractor={item => item.consumer_id}
                />}
            {filteredConsumers.length===0 &&
            <Text style={styles.warn}>No consumer ID/Name includes this text</Text>
            }
        </LinearGradient>
        </>
     );
}
 
export default ConsumerList;