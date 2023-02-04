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
    const brgyprk = GetData("brgyprk")
    const toReadConsumers = GetData(`toReadConsumers/${!barangay?'Boyog Proper':barangay}/${!purok? '5': purok}`)

    const {data, isPending, error, reload, setReload} = brgyprk
    const {data:toRead, isPending:toReadIsPending, error:toReadError, reload:toReadReload, setReload:toReadSetReload} = toReadConsumers
    console.log(toRead!==null && toRead.length)

    const generate = () => {
        console.log("Generated")
    
      }
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
        },centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
            backgroundColor:"rgba(0, 0, 0, 0.61)"
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 5,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width:"90%"
          },
          button: {
            borderRadius: 5,
            padding: 10,
            elevation: 2,
          },
          buttonOpen: {
            backgroundColor: '#F194FF',
          },
          buttonClose: {
            backgroundColor: toRead && toRead.length===0? 'rgba(173, 173, 173, 1)':'#27B735',
          },
          textStyle: {
            color: 'white',
            textAlign: 'center',
            fontSize:18
          },
          modalBarangay: {
            textAlign: 'center',
            fontWeight:"900",
            fontSize:30,
            color:'white'
          },
          modalPurok: {
            textAlign: 'center',
            fontWeight:'600',
            fontSize:18,
            color:'white'
          },
          cancel:{
            backgroundColor:'rgba(136, 136, 136, 1)',
            borderRadius: 5,
            padding: 10,
            elevation: 2,
            marginHorizontal:10
          },
          buttonsContainer:{
            flexDirection:'row',
            width:'100%',
            justifyContent:'flex-end',
            padding:10
          },
          contentText:{
            fontSize:22,
            
          },
          content:{
            width:'100%', 
            alignItems:'center', 
            marginHorizontal:20,
            height:120,
            justifyContent:'center'
          }
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ width:'100%',  backgroundColor: 'rgb(12,20,52)', padding: 10, borderTopLeftRadius:5, borderTopEndRadius:5 }}>
                        <Text style={styles.modalBarangay}>{`${barangay}`}</Text>
                        <Text style={styles.modalPurok}>{` Purok ${purok} `}</Text>
                        </View>

                        <View style={styles.content}>
                        {!toReadIsPending && toRead && 
                        <View style={{ flexDirection:'column', alignItems:'center' }}>
                        <Ionicons name="people" color={"white"} size={30} style={{ backgroundColor:'rgb(12,20,52)', padding:10, borderRadius:40}}/>
                        <Text style={{ ...styles.contentText, }}>
                            {`${toRead.length} Consumer/s`}
                        </Text>
                        
                        </View>}
                        {toReadIsPending && 
                        <Text style={{ ...styles.contentText, }}>
                            Fetching...
                        </Text>}
                        {toReadError && 
                        <Text style={{ ...styles.contentText, }}>
                            Fetching failed.
                        </Text>}
                        </View>
                        
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                            style={styles.cancel}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{ ...styles.textStyle, color:'white' }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            disabled={toRead && toRead.length===0? true:false}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Generate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
            </View>
        </>
     );
}


 
export default Body;