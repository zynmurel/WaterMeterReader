import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import SearchBar from "./HomeComponents/SearchBar";
import { useEffect, useState } from "react";
import ConsumerList from "./HomeComponents/ConsumerList";
import SettingModal from "./HomeComponents/BrgyPrkSettingsModal";
import ConfirmRemoveModal from "./HomeComponents/ConfirmRemoveModal";
import {LinearGradient} from 'expo-linear-gradient'
import * as SQLite from 'expo-sqlite';


const Reading = ({reloadHome, setReloadHome}) => {
    const db = SQLite.openDatabase("ready.db");
    const [searched, setSearched] = useState('')
    const navigation = useNavigation()
    const [openSettings, setOpenSettings] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const back = () => {
        navigation.goBack()
    }
    const openSetting =() =>{
        setOpenSettings(true)
    }
    const route = useRoute();
    const { item} = route.params;
    
    const [filteredConsumers, setFilteredConsumers] = useState([])
    useEffect(()=>{
        const getData = (db) => {
            return new Promise((resolve, reject) => {
              db.transaction(tx => {
                tx.executeSql(
                `SELECT * FROM ${item.name};`,
                  [],
                  (_, results) => {
                    const rows = results.rows._array;
                    resolve(rows);
                  },
                  (_, error) => reject(error)
                );
              });
            });
          };
          
          const showData = async () => {
            try {
              const data = await getData(db);
              setFilteredConsumers(data)
            } catch (error) {
              console.error(error);
            }
          };
          showData();

    },[searched, reloadHome])

    const filtered = filteredConsumers.filter((dt)=>{
        const name = `${dt.first_name} ${dt.last_name} ${dt.middle_name} ${dt.consumer_id}`.toLowerCase() 
        if(name.toLowerCase().includes(searched.toLowerCase()) && dt.reading_latest===null){
            return dt
        }
})

    const styles = StyleSheet.create({
        readingcontainer:{
            backgroundColor:'white',
            flex:1,
        },
        nav:{
            width:'100%',
            paddingTop:35,
            backgroundColor:'rgb(12,20,52)',
            paddingVertical:10,
            paddingHorizontal:15
        },
        body:{
            flex:1, 
            backgroundColor:'white',
            alignItems:'center',
            paddingHorizontal:5
        },
        back:{
            alignItems:'center',
            flexDirection:'row'
        },
        backText:{
            fontSize:15,
            color:'white',
            marginLeft:2
        },
        toptext1:{
            fontSize:22,
            fontWeight:'bold',
            marginTop:5,
            color:'white',
            
        },
        toptext2:{
            fontSize:15,
            color:'white',
            marginBottom:0
        },
        setting:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'rgb(12,20,52)',
            borderRadius:5,
            padding:5,
            paddingHorizontal:10,
            borderWidth:1,
            borderColor:'white'
        },
        settingText:{
            fontSize:15,
            color:'white',
            marginLeft:2,
            marginLeft:5,
             fontWeight:'bold'
        },
    })
    // useEffect(()=>{
    // const filteredSearch = () => {
    //     return item.data.filter((dt)=>{
    //         const name = `${dt.first_name} ${dt.last_name} ${dt.middle_name} ${dt.consumer_id}`.toLowerCase()
            
    //             if(name.includes(searched)){
    //                 return dt
    //             }
            
    //     })
    // }
    // console.log(filteredSearch())
    // setFilteredConsumers(filteredSearch())
    // },[])
    // console.log(filteredConsumers)
    return ( 
        <View style={styles.readingcontainer}>
        <StatusBar style='light'/>
        <View style={styles.nav}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <TouchableOpacity style={styles.back} 
            onPress={back}
            >
                <Ionicons name="arrow-back-circle-outline" size={40} color={"white"}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.back} 
            onPress={openSetting}
            >
                <LinearGradient colors={['#121D49', '#222A4A', '#353949']} style={styles.setting}>
                <Ionicons name="cog" size={25} color={'white'}/>
                <Text style={styles.settingText}>Reader Options</Text>
                </LinearGradient>
            </TouchableOpacity>
            </View>
                <Text style={styles.toptext1}>
                    {item.barangay}
                </Text>
                <Text style={styles.toptext2}>
                    ( Purok {item.purok} )
                </Text>
        
        </View>
            <View style={styles.body}>
            <SearchBar
            searched={searched}
            setSearched={setSearched}
            />
            <ConsumerList
            filteredConsumers={filteredConsumers}
            setFilteredConsumers={setFilteredConsumers}
            barangayName={item.name}
            reloadHome={reloadHome}
            setReloadHome={setReloadHome}
            totalConsumer={item.totalConsumer}
            totalReaded = {item.totalReaded}
            data={filtered}
            searched={searched}
            />
            </View>
            <SettingModal
            areadata ={{ name:item.name, barangay:item.barangay, purok:item.purok }}
            openSettings={openSettings}
            setOpenSettings={setOpenSettings}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            />
            <ConfirmRemoveModal
            areadata ={{ name:item.name, barangay:item.barangay, purok:item.purok }}
            openSettings={openSettings}
            setOpenSettings={setOpenSettings}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            reloadHome={reloadHome}
            setReloadHome={setReloadHome}/>
        </View>
     );
}
 
export default Reading;