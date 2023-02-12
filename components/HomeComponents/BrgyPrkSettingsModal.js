import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

const SettingModal = ({
    openSettings,
    setOpenSettings,
    openConfirm,
    setOpenConfirm,
    areadata
}) => {
    const styles = StyleSheet.create({
        container:{
            backgroundColor:'white',
            width:'90%',
            borderRadius:10,
        },
        top:{
            height:50,
            backgroundColor:"rgb(12,20,52)",
            alignItems:'center',
            justifyContent:'center',
            borderTopRightRadius:10,
            borderTopLeftRadius:10,
        },
        topText:{
            color:'white',
            fontSize:20,
            fontWeight:'bold'
        },
        topIcon:{
            position:'absolute',
            right:20
        },
        content:{
            paddingVertical:10,
            paddingBottom:20,
            alignItems:'center',
        },
        optionButtons:{
            width:'90%',
            margin:5,
            borderRadius:5,
            elevation: 3,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.1,
                height: -0.1, },
            alignItems:'center',
            borderWidth:1,
            borderColor:'#ccff99'
        }
    })
    return ( 
        <Modal
        animationType='fade'
        transparent={true}
        visible={openSettings}
        onRequestClose={() => {
            setOpenSettings(!openSettings);
            }}>
            <View 
            style={{ alignItems:'center', justifyContent:'center', backgroundColor:"rgba(0, 0, 0, 0.61)", height:'100%'  }}>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.topText}
                        >Reader Options</Text>
                            <TouchableOpacity style={styles.topIcon}
                            onPress={()=>{setOpenSettings(!openSettings)}}>
                                <Ionicons name="close" color={"white"} size={30}  />
                            </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TouchableOpacity 
                            onPress={()=>{setOpenSettings(!openSettings)}} style={{ width:'100%',...styles.optionButtons }}>
                                <LinearGradient colors={['#66CD00', '#8DCE4D', '#A7DC72']} style={{ width:'100%', borderRadius:4, justifyContent:'center' }}>
                                    <Ionicons name="list-circle-outline" color={"white"} size={25} style={{ position:'absolute', left:10 }}/>
                                    <Text style={{  color:'white', fontWeight:'bold', fontSize:16, marginHorizontal:25, textAlign:'center', marginVertical:10 }}>
                                        List of Readed Consumers
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.optionButtons, backgroundColor:'#CD0000', borderColor:'#F76F6F'}}
                            onPress={()=>{
                                setOpenConfirm(true)
                                setOpenSettings(false)
                            }}>
                                <LinearGradient colors={['#cc0000', '#C33434', '#DE8383']} style={{ width:'100%', borderRadius:4, justifyContent:'center' }}>
                                    <Ionicons name="trash-outline" color={"white"} size={25} style={{ position:'absolute', left:10 }}/>
                                    <Text style={{  color:'white', fontWeight:'bold', fontSize:16, marginHorizontal:25, textAlign:'center', marginVertical:10 }}>
                                        Remove Barangay Purok
                                    </Text>
                                </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </Modal>
     );
}
 
export default SettingModal;