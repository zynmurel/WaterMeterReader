import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { Ionicons } from '@expo/vector-icons';
import SelectBarangay from "./SelectBarangay";
import {  useEffect, useState } from "react";
import GetData from "../../Hooks/GetData";
import ToGenerateModal from "./ToGenerateModal";
import ListOfBrgyPrk from "./ListOfBrgyPrk";

const Body = ({db, data:generated, setReloadGenerated, reloadGenerated}) => {
    const [barangay, setBarangay] = useState("") 
    const [purok, setPurok] = useState("") 
    const [modalVisible, setModalVisible] = useState(false);
    const brgyprk = GetData("brgyprk")
    const toReadConsumers = GetData(`toReadConsumers/${!barangay?'Baucan Sur':barangay}/${!purok? '1': purok}`)

    const {data, isPending, error, reload, setReload} = brgyprk
    const {data:toRead, isPending:toReadIsPending, error:toReadError, reload:toReadReload, setReload:toReadSetReload} = toReadConsumers
    const dateNow = new Date()
  const month= ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const onSearch = () => {
        toReadSetReload(toReadReload? false:true)
    }
    let allbarangay = []
    let allpurok = data!==null && barangay ? data[barangay].sort() : [];
    if(data!==null){
        for (const key in data) {
            allbarangay.push(key)
          }
    }
    const styles = StyleSheet.create({
        body:{
            flex:8,
            width:'100%',
            alignItems:'center',
            backgroundColor:'rgba(247, 247, 247, 1)',
        },
        purokbarangay:{
            flexDirection:'row',
            width:'100%',
            paddingHorizontal:10,
            justifyContent:'space-around'
        },
        date:{
            fontSize:50,
            fontWeight:'900',
            color:'rgb(12,20,52)',
            padding:0
        },
        appButtonText: {
          fontSize: 16,
          color: "#fff",
          alignSelf: "center",
          textTransform: "uppercase",
          marginLeft:10
        },
        appButtonContainer: {
          elevation: 8,
          backgroundColor: isPending || !purok?"gray":"rgb(12,20,52)",
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 20,
          margin:15,
          flexDirection:'row',
          justifyContent:'flex-start'
        }
    })
    return ( 
        <>
            <View style={styles.body}>
                <Text style={ styles.date}>{`${month[dateNow.getMonth()-1].slice(0,3).toUpperCase()} ${dateNow.getFullYear()}`}</Text>
                <View style={styles.purokbarangay}>
                <SelectDropdown 
                style={{ color:'red' }}
                defaultButtonText={isPending?"Loading...":"Barangay"}
                value={barangay}
                buttonStyle={{ backgroundColor:'white', borderRadius:5, borderWidth:1, borderColor:'gray', justifyContent:'flex-end', width:220, borderColor:isPending || allbarangay.length===0?"#AEAEAE":"black"}}
                buttonTextStyle={{ color:"black", fontSize:15 }}
                renderDropdownIcon={()=> <Ionicons name="caret-down" size={20} color={isPending || allbarangay.length===0?"#AEAEAE":"black"}/>}
                dropdownIconPosition="left"
                dropdownStyle={{ marginTop:-28, width:'80%' }}
                rowTextStyle={{ fontSize:15 }}
                data={allbarangay}
                disabled={isPending || allbarangay.length===0 ?true:false}
                onSelect={(selectedItem, index) => {
                    setBarangay(selectedItem)
                }}
                itemStyle={{justifyContent: 'flex-start|flex-end|center', color:'white'}}
            />
            <SelectDropdown 
                style={{ color:'red' }}
                value={purok}
                defaultButtonText={isPending?"Loading...":"Purok"}
                buttonStyle={{ backgroundColor:'white', borderRadius:5, borderWidth:1, borderColor:'gray', justifyContent:'flex-end', width:100, borderColor:isPending || allpurok.length===0?"#AEAEAE":"black" }}
                buttonTextStyle={{ color:"black", fontSize:15 }}
                renderDropdownIcon={()=> <Ionicons name="caret-down" size={20} color={isPending || allpurok.length===0?"#AEAEAE":"black"}/>}
                dropdownIconPosition="left"
                data={allpurok}
                rowTextStyle={{ fontSize:15 }}
                disabled={isPending || allpurok.length===0? true:false}
                dropdownStyle={{ marginTop:-28 }}
                onSelect={(selectedItem, index) => {
                    setPurok(selectedItem)
                }}
                itemStyle={{justifyContent: 'flex-start|flex-end|center', color:'white'}}
            />
                </View>
                <TouchableOpacity 
                onPress={ ()=>{ 
                    setModalVisible(true)
                    onSearch();
                }} 
                style={styles.appButtonContainer}
                disabled={ isPending || !purok? true:false}>
                    <Ionicons name="search" color={"white"} size={20}/>
                    <Text style={styles.appButtonText} >{"Search"}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>{
                    setReloadGenerated(reloadGenerated?false:true)
                    db.transaction(tx => {
                        tx.executeSql(
                          'DROP TABLE IF EXISTS readBoyogNorte4;'
                        );
                      });
                    }}>
                    <Text>Maui</Text>
                </TouchableOpacity> */}
                <ListOfBrgyPrk 
                db={db}
                generated={generated}
                reloadGenerated={reloadGenerated} 
                setReloadGenerated={setReloadGenerated}/>

                <ToGenerateModal 
                toReadReload={toReadReload}
                modalVisible={modalVisible}
                toRead={toRead}
                toReadError={toReadError}
                toReadIsPending={toReadIsPending}
                barangay={barangay}
                purok={purok}
                setModalVisible={setModalVisible}
                db={db}
                generated={generated}
                reloadGenerated={reloadGenerated} 
                setReloadGenerated={setReloadGenerated}
                />
                
            </View>
        </>
     );
}


 
export default Body;