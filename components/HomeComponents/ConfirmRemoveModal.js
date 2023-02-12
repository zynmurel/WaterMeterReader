import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite'
import {LinearGradient} from 'expo-linear-gradient'
const ConfirmRemoveModal = ({
    areadata,
    openSettings,
    setOpenSettings,
    openConfirm,
    setOpenConfirm,
    reloadHome, 
    setReloadHome,
}) => {
    const navigation = useNavigation()
    const db = SQLite.openDatabase("ready.db");
    const removeArea = ( ) => {
                    db.transaction(tx => {
                        tx.executeSql(
                          `DROP TABLE IF EXISTS ${areadata.name};`
                        );
                      });
                    navigation.navigate("Home")
    }
    const styles = StyleSheet.create({
        confirm:{
            backgroundColor:'white',
            borderRadius:10,
            padding:30,
            paddingVertical:15,
            justifyContent:'center',
            alignItems:'center',
            width:'90%'
        },
        optionButtons:{
            backgroundColor:'#61C300',
            margin:5,
            padding:10,
            width:120,
            borderRadius:5,
            elevation: 3,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.1,
                height: -0.1, },
            alignItems:'center'
        }
    })
    return ( 
        <Modal
            animationType='fade'
            transparent={true}
            visible={openConfirm}
            onRequestClose={() => {
                setOpenConfirm(!openConfirm);
                }}>
            <View
            style={{ alignItems:'center', justifyContent:'center', backgroundColor:"rgba(0, 0, 0, 0.61)", height:'100%'  }}>
                <LinearGradient colors={['#D7D7D7', 'white', '#D7D7D7']} style={styles.confirm}>
                    <Ionicons name="alert-circle" color={"red"} size={50}/>
                    <Text style={{ fontSize:18, textAlign:'center', marginBottom:10, }}>Do you really want to remove {areadata.barangay} Purok-{areadata.purok} ?</Text>
                        <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                        <TouchableOpacity style={{ ...styles.optionButtons, backgroundColor:'gray', }}
                            onPress={()=>{
                                setOpenConfirm(false)
                                setOpenSettings(true)
                            }}>
                                <View style={{ justifyContent:'center', alignItems:'center', flexDirection:'row' }}> 
                                    <Ionicons name="chevron-back-circle-outline" color={"white"} size={20}/>
                                    <Text style={{  color:'white', fontWeight:'bold', fontSize:15, marginHorizontal:10, textAlign:'center' }}>
                                        Cancel
                                    </Text>
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.optionButtons, backgroundColor:'#CD0000', }}
                            onPress={()=>{
                                removeArea()
                                setReloadHome(!reloadHome)
                            }}>
                                <View style={{ justifyContent:'center', alignItems:'center', flexDirection:'row' }}> 
                                    <Ionicons name="trash-outline" color={"white"} size={20}/>
                                    <Text style={{  color:'white', fontWeight:'bold', fontSize:15, marginHorizontal:10, textAlign:'center' }}>
                                        Remove
                                    </Text>
                                </View>
                        </TouchableOpacity>
                        </View>
                </LinearGradient>
            </View>

        </Modal> );
}
 
export default ConfirmRemoveModal;