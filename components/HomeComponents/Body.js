import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import { Ionicons } from '@expo/vector-icons';
import SelectBarangay from "./SelectBarangay";
import {  useState } from "react";
import GetData from "../../Hooks/GetData";

const Body = () => {
    const [barangay, setBarangay] = useState("") 
    const [purok, setPurok] = useState("") 
    const [modalVisible, setModalVisible] = useState(false);
    const generate = () => {
        console.log("Generated")
    
      }
    const brgyprk = GetData("brgyprk")
    const {data, isPending, error, reload, setReload} = brgyprk
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
            alignItems:'center'
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
            padding:10
        },
        appButtonText: {
          fontSize: 16,
          color: "#fff",
          alignSelf: "center",
          textTransform: "uppercase"
        },
        appButtonContainer: {
          elevation: 8,
          backgroundColor: isPending || !purok?"gray":"rgb(12,20,52)",
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 50,
          margin:15,
        },centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
            backgroundColor:"rgba(0, 2, 42, 0.50)"
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            height:'80%',
            width:"90%"
          },
          button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          },
          buttonOpen: {
            backgroundColor: '#F194FF',
          },
          buttonClose: {
            backgroundColor: '#2196F3',
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
    })
    return ( 
        <>
            <View style={styles.body}>
                <Text style={ styles.date}>JAN 2022</Text>
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
                    console.log(selectedItem, index)
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
                    console.log(selectedItem, index)
                    setPurok(selectedItem)
                }}
                itemStyle={{justifyContent: 'flex-start|flex-end|center', color:'white'}}
            />
                </View>
                <TouchableOpacity 
                onPress={ ()=>{ setModalVisible(true)}} 
                style={styles.appButtonContainer}
                disabled={ isPending || !purok? true:false}>
                    <Text style={styles.appButtonText} >{"Search"}</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
            </View>
        </>
     );
}


 
export default Body;