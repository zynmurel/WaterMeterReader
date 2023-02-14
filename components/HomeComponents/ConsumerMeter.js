import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import CameraController from "./Camera/CameraController";
import * as SQLite from 'expo-sqlite'


const ConsumerMeter = ({
    data,
    reading,
    setReading,
    previousReading,
    reloadHome,
    setReloadHome,
    generated
}) => {
    const [openCam, setOpenCam]=useState(false)
    const [viewPhoto, setViewPhoto]=useState(false)
    const [image, setImage] = useState(null)
    const [imageBase64, setImageBase64] = useState("")
    const cameraRef = useRef(null)
    const navigation = useNavigation()
    const [plus, setPlus] = useState(1)
    const [disableSubtract, setDisableSubtract] = useState(true)
    const db = SQLite.openDatabase("ready.db")
    let paddedPresentReading = reading.toString().padStart(5, "0").split("");
    let paddedPreviousReading = previousReading.toString().padStart(5, "0").split("");
    const addCubicMeter = () => {
        setReading(reading+plus)
        setDisableSubtract(false)
    }
    const subtractCubicMeter = () => {
        setDisableSubtract(false)
        if(previousReading+1<=reading){
            setReading(reading-plus)
            setDisableSubtract(false)
        }
        if(previousReading+1>=reading){
            setDisableSubtract(true)
        }
    }
    const submitReading =  ( consumer_id, reading_latest, reading_img, table) => {
       
            db.transaction(tx => {
                tx.executeSql(
                  `UPDATE ${table} SET reading_latest = ?, reading_img = ? WHERE consumer_id = ?;`,
                  [reading_latest, reading_img, consumer_id],
                  (tx, results) => {
                    console.log('Results', results.rowsAffected);
                  },
                  (error) => {
                    console.log('Error', error);
                  }
                );
              });
        
      };
    const styles = StyleSheet.create({
        meter:{
            width:'100%',
            padding:5,
            alignItems:'center',
            backgroundColor:'rgba(247, 247, 247, 1)',
            height:'100%'
        },
        previousReading:{
            justifyContent:'center',
            alignItems:'center'
        },
        prevtext:{
            fontSize:12,
            fontWeight:'600',
            color:'rgba(89, 89, 89, 1)',
            paddingHorizontal:20,
            marginBottom:0,
            marginTop:5
        },
        previousmeter:{
            flexDirection:'row',
            justifyContent:'center',
            paddingHorizontal:5,
            paddingVertical:1,
            backgroundColor:'rgba(133, 133, 133, 1)',
            borderRadius:2,
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.05,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.9,
                height: -0.9, },
            borderWidth:1,
            borderColor:'white'
        },
        prevdigitcontainer:{
            paddingHorizontal:6,
            paddingVertical:0,
            margin:1.5,
            borderRadius:2,
            backgroundColor:'white'
        },
        prevdigit:{
            fontSize:17,
            fontWeight:'bold'
        },
        mcubeprev:{
            position:'absolute',
            right:-22,
            top:26
        },
        presentReading:{
            justifyContent:'center',
            alignItems:'center',
            padding:10,
        },
        prsnttext:{
            fontWeight:'bold',
            marginBottom:2,
            color:'#444762',
        },
        presentmeter:{
            flexDirection:'row',
            justifyContent:'center',
            paddingHorizontal:15,
            paddingVertical:2,
            backgroundColor:'rgb(12,20,52)',
            borderRadius:4,
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.9,
                height: -0.9, },
            borderWidth:1,
            borderColor:'white',
        },
        prsntdigitcontainer:{
            alignItems:'center',
            justifyContent:'center',
            paddingVertical:0,
            margin:3,
            marginHorizontal:3,
            borderRadius:2,
            backgroundColor:'white',
            width:35
        },
        prsntdigit:{
            fontSize:30,
            fontWeight:'bold',
            color:'rgba(40, 42, 77, 1)',
        },
        mcubeprsnt:{
            position:'absolute',
            fontSize:20,
            right:20,
            top:20,
            fontWeight:'bold',
            color:'rgba(40, 42, 77, 1)',
        },
        controller:{
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        },
        minus:{
            borderRadius:5,
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.9,
                height: -0.9, },
            borderWidth:1,
            borderColor:'white',
            marginHorizontal:5

        },
        plus:{
            borderRadius:5,
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.9,
                height: -0.9, },
            borderWidth:1,
            borderColor:'white',
            marginHorizontal:5

        },
        prsnttext:{ 
            fontSize:15,
            fontWeight:'600',
            color:'rgba(89, 89, 89, 1)',
            width:'100%',
            paddingHorizontal:20,
            marginBottom:3,
            marginTop:10
        },
        presentContainer:{
            backgroundColor:'white',
            width:'95%',
            marginTop:0,
            paddingBottom:10,
            borderRadius:5,
            borderWidth:1,
            borderColor:'rgba(216, 216, 216, 1)',
        },
        camicon:{
            padding:10,
            borderRadius:100,
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.9,
                height: -0.9, },
            borderWidth:1,
            borderColor:'white',
        },
        camiconcontainer:{
            borderRadius:100,
            justifyContent:'center',
            alignItems:'center'
        },
        camcontroller:{
            flexDirection:'row',
            margin:5,
        },
        cam:{
            flexDirection:'column',
            alignItems:'center',
            flex:1
        },
        camtext:{
            margin:5,
            fontWeight:'bold',
            fontSize:13,
            color:'rgba(45, 45, 45, 1)'
        },
        camera:{
            borderWidth:1,
            borderColor:"#39E145",
            height:80,
            width:80,
            borderRadius:5,
            borderStyle:'dashed',
            justifyContent:'center', 
            alignItems:'center'
        },
        photo:{
            borderWidth:1,
            borderColor:"white",
            height:400,
            width:300,
            borderRadius:5,
            borderStyle:'dashed',
            justifyContent:'center', 
            alignItems:'center'
        },
        submit:{
            padding:10,
            paddingHorizontal:30,
            margin:30,
            backgroundColor:'green',
            borderRadius:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            elevation: 2,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { 
                width: 0.9,
                height: -0.9, },
        },
        submitText:{
            fontSize:18,
            marginHorizontal:5,
            color:'white',
            fontWeight:'bold'
        }
    })
    return ( 
        <View style={styles.meter}>
            <View style={styles.previousReading}>
                <Text style={styles.prevtext}>Previous Reading</Text>
                    <LinearGradient colors={['rgba(128, 128, 128, 1)','rgba(50, 50, 50, 1)']} style={styles.previousmeter}>
                    {
                        paddedPreviousReading.map((prv, index)=>(
                            <View style={styles.prevdigitcontainer} key={index}>
                                <Text style={styles.prevdigit}>
                                    {prv}
                                </Text>
                            </View>
                        ))
                    }
                    </LinearGradient>
                <Text style={styles.mcubeprev}>m³</Text>
            </View>

            <Text style={styles.prsnttext}>Present Reading</Text>
            <View style={styles.presentContainer}>
                    <View style={styles.presentReading}>
                                <LinearGradient colors={['rgba(26, 26, 26, 1)', 'rgba(26, 26, 26, 1)']} style={styles.presentmeter}>
                                {
                                    paddedPresentReading.map((prsnt, index)=>(
                                        <View style={styles.prsntdigitcontainer} key={index}>
                                            <Text style={styles.prsntdigit}>
                                                {prsnt}
                                            </Text>
                                        </View>
                                    ))
                                }
                                </LinearGradient>
                            <Text style={styles.mcubeprsnt}>m³</Text>
                    </View>

                    <View style={styles.controller}>
                        <TouchableOpacity style={styles.minus} onPress={subtractCubicMeter}  disabled={disableSubtract}>
                            <LinearGradient colors={disableSubtract?['rgba(218, 218, 218, 1)','rgba(186, 186, 186, .5)']:['rgba(255, 213, 130, 1)', 'rgba(255, 192, 66, 1)', 'rgba(255, 170, 0, 1)']} style={{borderRadius:6}}>
                                <Ionicons name="remove-outline" size={30} color={"white"} style={{ margin:5 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.plus} onPress={()=>{
                            addCubicMeter()
                        }}>
                            <LinearGradient colors={['rgba(255, 213, 130, 1)', 'rgba(255, 192, 66, 1)', 'rgba(255, 170, 0, 1)']} style={{borderRadius:6}}>
                                <Ionicons name="add-outline" size={30} color={"white"} style={{ margin:5 }}/>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>
                            <Text style={styles.prsnttext}>Proof of Reading</Text>
                <View style={styles.presentContainer}>

                    <View style={{ ...styles.camcontroller }}>
                        <View style={styles.cam}>
                            <Text style={styles.camtext}>{image?"Re-take" : "Take a Photo"}</Text>
                            <TouchableOpacity 
                            onPress={()=>{
                                setImage(null)
                                setOpenCam(true)
                                }} style={styles.camiconcontainer}>
                                <LinearGradient colors={['rgba(255, 213, 130, 1)', 'rgba(255, 192, 66, 1)', 'rgba(255, 170, 0, 1)']} style={styles.camicon}>
                                    <Ionicons name={image?"camera-reverse-outline":"camera-outline"} size={40} color={"white"} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cam}>
                            <Text style={styles.camtext}>View Photo</Text>
                            <TouchableOpacity onPress={subtractCubicMeter} style={styles.camiconcontainer} disabled={image?false:true}>
                                {image ? 
                                <TouchableOpacity onPress={()=>setViewPhoto(true)}>
                                    <Image source={{ uri:image }} style={styles.camera}/>
                                </TouchableOpacity>
                                : 
                                <View style={{ ...styles.camera, borderColor:'gray' }}>
                                    <Text style={{ color:'gray', textAlign:'center' }}>Take a photo</Text>
                                </View>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity 
                onPress={()=>{
                    submitReading(data.consumer_id, reading, imageBase64, `read${data.barangay.replace(" ", "")}${data.purok}`);
                    setReloadHome(!reloadHome)
                    navigation.goBack()
                }}
                disabled={disableSubtract || !image? true:false}
                >    
                <LinearGradient colors={disableSubtract || !image?['rgba(218, 218, 218, 1)','rgba(186, 186, 186, 1)']:['#00CA00', '#009A00', '#007C00']} style={styles.submit}> 
                    <Entypo name={"export"} size={25} color={"white"} />
                    <Text style={styles.submitText}>Submit</Text>
                </LinearGradient>
                </TouchableOpacity>
                
            <CameraController
            openCam={openCam}
            setOpenCam={setOpenCam}
            image={image}
            setImage={setImage}
            cameraRef={cameraRef}
            imageBase64={imageBase64}
            setImageBase64={setImageBase64}
            />
            <Modal
            animationType='slide'
            transparent={true}
            visible={viewPhoto}
            onRequestClose={() => {
                setViewPhoto(!viewPhoto);
                }}
            >
                <View style={{ alignItems:'center', justifyContent:'center', flex:1, backgroundColor:'rgba(0,0,0,.8)' }}>
                    <Image source={{ uri:image }} style={styles.photo}/>
                    <TouchableOpacity style={{ margin:10 }} onPress={()=>setViewPhoto(false)}>
                        <Ionicons name={"close-circle-outline"} size={40} color={"white"} />
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
     );
}
 
export default ConsumerMeter;