import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import ConsumerMeter from "./HomeComponents/ConsumerMeter";
import AsyncStorage from '@react-native-async-storage/async-storage'

const ConsumerPage = ({route, reloadHome, setReloadHome}) => {
    const getCubicMeters =async()=> {
        const cubic_rates = await AsyncStorage.getItem("cubic_rates")
        //const parsed = JSON.parse(cubicMeters && cubicMeters.data.cubic_rates)
        setCubicMeters(JSON.parse(cubic_rates))
      }
    const back = () => {
        navigation.goBack()
    }
    const { item } = route.params;
    const [reading, setReading] = useState(item.present_reading===""?0:item.present_reading)
    const navigation = useNavigation()
    const db = SQLite.openDatabase('ready.db'); 
    const [cubicMeters, setCubicMeters] = useState([])
    useEffect(()=>{
        getCubicMeters();
    },[])
    const styles = StyleSheet.create({
        container:{
            flex:1,
            width:'100%',
            backgroundColor:'white'
        },
        nav:{
            width:'100%',
            backgroundColor:'rgb(12,20,52)',
            paddingHorizontal:15
        },
        back:{
            alignItems:'center',
            flexDirection:'row'
        },
        navText:{
            color:'white',
            marginLeft:10,
            fontSize:20,
            fontWeight:'bold'
        },
        consumer_info:{
            paddingVertical:10,
            paddingHorizontal:5,
            borderWidth:1,
            borderColor:'rgba(216, 216, 216, 1)'
        },
        consumer_name:{
            flexDirection:'row',
            alignItems:'center'
        },
        consumer_name_text:{
            fontSize:20,
            fontWeight:'800',
            color:'rgb(12,20,52)',
        },
        consumer_barangay_text:{
            fontSize:17
        },
        box:{ 
            width:35, 
            alignItems:'center',
            marginHorizontal:5,
            marginVertical:2,
            //  borderColor:'rgb(12,20,52)',
            //  borderRightWidth:1,
        }
    })
    return ( 
        <>
            <View style={styles.container}>
                
                <View style={styles.nav}>
                    <View style={{ flexDirection:'row', alignItems:'center', marginTop:28, paddingVertical:10 }}>
                    <TouchableOpacity style={styles.back} 
                    onPress={back}
                    >
                        <Ionicons name="arrow-back-circle-outline" size={30} color={"white"}/>
                    </TouchableOpacity>
                    <Text style={styles.navText}>
                        ID {item.consumer_id}
                    </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.consumer_info}>
                        <View style={styles.consumer_name}>
                            <View style={styles.box}>
                                <Ionicons name={"person"} size={20} color={"#004c99"} />
                            </View>
                            <Text style={styles.consumer_name_text}>{item.first_name} {item.middle_name} {item.last_name}</Text>
                        </View>
                        <View style={{ ...styles.consumer_name}}>
                            <View style={{ ...styles.box, marginVertical:0 }}>
                                <Ionicons name={"location"} size={20} color={"#A80000"} />
                            </View>
                            <Text style={styles.consumer_barangay_text}>{item.barangay} (Purok {item.purok})</Text>
                        </View>
                        <View style={{ ...styles.consumer_name}}>
                            <View style={{ ...styles.box, marginVertical:0 }}>
                                <Ionicons name={"call"} size={20} color={"#4c9900"} />
                            </View>
                            <Text style={styles.consumer_barangay_text}>{item.phone}</Text>
                        </View>
                    </View>

                </View>
                <ConsumerMeter
                cubicMeters={cubicMeters}
                data={item}
                previousReading = { item.present_reading===""?0:item.present_reading}
                reading={reading}
                setReading={setReading}
                reloadHome={reloadHome}
                setReloadHome={setReloadHome}
                item={item}
                />

            </View>
        </>
     );
}
 
export default ConsumerPage;