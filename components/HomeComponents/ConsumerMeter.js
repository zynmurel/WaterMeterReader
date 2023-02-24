import { StyleSheet, View, Text, TouchableOpacity, Image, Modal } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import CameraController from "./Camera/CameraController";
import SelectDropdown from 'react-native-select-dropdown'
import * as SQLite from 'expo-sqlite'


const ConsumerMeter = ({
    cubicMeters,
    item,
    data,
    reading,
    setReading,
    previousReading,
    reloadHome,
    setReloadHome,
    generated
}) => {
    const plusValues = [1,2,5]
    const [openCam, setOpenCam]=useState(false)
    const [viewPhoto, setViewPhoto]=useState(false)
    const [image, setImage] = useState(null)
    const [imageBase64, setImageBase64] = useState("")
    const cameraRef = useRef(null)
    const navigation = useNavigation()
    const [plus, setPlus] = useState(1)
    const [disableSubtract, setDisableSubtract] = useState(true)
    const [openConfirmSubmit, setOpenConfirmSubmit] = useState(false)
    const db = SQLite.openDatabase("ready.db")
    let paddedPresentReading = reading.toString().padStart(5, "0").split("");
    let paddedPreviousReading = previousReading.toString().padStart(5, "0").split("");
    let pressableminus = false
    let present_bill = 0
    const totalReading = (reading - (previousReading===""?0:previousReading))
    if(cubicMeters.length!==0){
        if(item.usage_type.toLowerCase()==="residential"){
            if(totalReading <=cubicMeters[0].max_cubic){
    
                present_bill=cubicMeters[0].fixed_rate
    
            }else if(totalReading>=cubicMeters[1].min_cubic && totalReading<=cubicMeters[1].max_cubic){
    
                present_bill = totalReading * cubicMeters[1].cubic_rate
    
            }else if(totalReading>=cubicMeters[2].min_cubic && totalReading<=cubicMeters[2].max_cubic){
    
                present_bill = totalReading * cubicMeters[2].cubic_rate
    
            }else if(totalReading>=cubicMeters[3].min_cubic && totalReading<=cubicMeters[3].max_cubic){
    
                present_bill = totalReading * cubicMeters[3].cubic_rate
    
            }else if(totalReading>=cubicMeters[4].min_cubic){
    
                present_bill = totalReading * cubicMeters[4].cubic_rate
    
            }
        }
        if(item.usage_type.toLowerCase()==="commercial"){
    
            if(totalReading <=cubicMeters[5].max_cubic){
    
                present_bill=cubicMeters[5].fixed_rate
    
            }else if(totalReading>=cubicMeters[6].min_cubic && totalReading<=cubicMeters[1].max_cubic){
    
                present_bill = totalReading * cubicMeters[6].cubic_rate
    
            }else if(totalReading>=cubicMeters[7].min_cubic && totalReading<=cubicMeters[2].max_cubic){
                
                present_bill = totalReading * cubicMeters[7].cubic_rate
    
            }else if(totalReading>=cubicMeters[8].min_cubic && totalReading<=cubicMeters[8].max_cubic){
    
                present_bill = totalReading * cubicMeters[8].cubic_rate
    
            }else if(totalReading>=cubicMeters[9].min_cubic){
    
                present_bill = totalReading * cubicMeters[9].cubic_rate
            }
        }
    }
    if(reading - plus -plus <previousReading){
            pressableminus=true
        }else pressableminus=false
    const addCubicMeter = () => {
        setReading(reading+plus)
        setDisableSubtract(false)
        // if(reading - plus -plus <previousReading){
        //     setDisableSubtract(true)
        // }else setDisableSubtract(true)
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
        setDisableSubtract(pressableminus)
        console.log(pressableminus)
        // if(reading - plus -plus <previousReading){
        //     setDisableSubtract(true)
        // }else setDisableSubtract(false)
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
            borderRadius:5,
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
        },
        cancel:{
          backgroundColor:'rgba(136, 136, 136, 1)',
          borderRadius: 2,
          padding: 10,
          elevation: 2,
          marginHorizontal:10
        },
        buttonsContainer:{
          flexDirection:'row',
          width:280,
          justifyContent:'flex-end',
          padding:10
        },
        button: {
          borderRadius: 2,
          padding: 10,
          elevation: 2,
        },
        buttonClose: {
          backgroundColor:'#27B735',
        },
        textStyle: {
          color: 'white',
          textAlign: 'center',
          fontSize:16
        },
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
                    <SelectDropdown 
                        value={plus}
                        defaultValue={plus}
                        buttonStyle={{ backgroundColor:'white', borderRadius:5, borderWidth:1, borderColor:'gray', justifyContent:'flex-end', width:80, height:40, borderColor:"black" }}
                        buttonTextStyle={{ color:"black", fontSize:20 }}
                        renderDropdownIcon={()=> <Ionicons name="caret-down" size={15} color="black"/>}
                        dropdownIconPosition="left"
                        data={plusValues}
                        rowTextStyle={{ fontSize:20 }}
                        dropdownStyle={{ marginTop:-28 }}
                        onSelect={(selectedItem, index) => {
                            setPlus(selectedItem)
                            setDisableSubtract(pressableminus)
                            // if(reading - plus -plus <previousReading){
                            //     setDisableSubtract(true)
                            // }else setDisableSubtract(false)
                        }}
                        itemStyle={{justifyContent: 'flex-start|flex-end|center', color:'white'}}
                    />
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
                    // submitReading(data.consumer_id, reading, imageBase64, `read${data.barangay.replace(/ /g,"").replace("(","").replace(")","").replace("-","")}${data.purok}`);
                    // setReloadHome(!reloadHome)
                    // navigation.goBack()
                    setOpenConfirmSubmit(true)
                }}
                disabled={disableSubtract || !image? true:false}
                >    
                <LinearGradient colors={disableSubtract || !image?['rgba(218, 218, 218, 1)','rgba(186, 186, 186, 1)']:['#00CA00', '#009A00', '#007C00']} style={styles.submit}> 
                    <Entypo name={"export"} size={20} color={"white"} />
                    <Text style={styles.submitText}>Read</Text>
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

            <Modal
            animationType='fade'
            transparent={true}
            visible={openConfirmSubmit}
            onRequestClose={() => {
                setOpenConfirmSubmit(false)
                }}
            >
                <View style={{ alignItems:'center', justifyContent:'center', flex:1, backgroundColor:'rgba(0,0,0,.8)' }}>
                    <View style={{backgroundColor:'white', borderRadius:3,alignItems:'center', justifyContent:'center' }}>
                        <View style={{ width:'100%', backgroundColor:'rgb(12,20,52)', padding:10, paddingHorizontal:15, width:300, borderTopLeftRadius:3, borderTopRightRadius:3 }}>
                            <Text style={{ fontSize:20, color:'white', fontWeight:'bold' }}>Reading Result</Text>
                        </View>
                        <View style={{ width:'100%', backgroundColor:'white', padding:10,paddingTop:5, borderBottomLeftRadius:3, borderBottomRightRadius:3, justifyContent:'center', alignItems:'center' }}>
                            <View style={{ width:260 }}>
                                <Text style={{ fontSize:11, marginBottom:-5, color:'gray' }}>Name</Text>
                                <Text style={{ fontSize:18, marginLeft:3 }}>{item.first_name} {item.middle_name} {item.last_name}</Text>
                                <Text style={{ fontSize:11, marginBottom:-5, color:'gray' }}>Barangay</Text>
                                <Text style={{ fontSize:16, marginLeft:3 }}>{item.barangay} - Purok {item.purok}</Text>
                                <Text style={{ fontSize:11, marginBottom:-5, color:'gray' }}>Type</Text>
                                <Text style={{ fontSize:16, marginLeft:3 }}>{item.usage_type}</Text>
                            </View>
                            <View style={{ padding:10,paddingTop:5, margin:5, width:260, backgroundColor:'#D6D8E9', borderRadius:3, justifyContent:'center', alignItems:'center' }}>
                                <Text style={{ fontSize:18, fontWeight:'bold', color:'#272A37', width:'100%', borderBottomWidth:1, paddingBottom:2 }}>Reading</Text>
                                <View style={{ width:'100%', padding:4, flexDirection:'row', justifyContent:"space-around" }}>
                                    <View>
                                        <Text style={{ fontSize:12, width:100,color:'#494949', marginBottom:-5 }}>Previous</Text>
                                        <Text style={{ fontSize:25, width:100,color:'#494949', fontWeight:'bold' }}>{paddedPreviousReading}</Text>

                                    </View>
                                    <View>
                                        <Text style={{ fontSize:12, width:100,color:'#494949', marginBottom:-5 }}>Present</Text>
                                        <Text style={{ fontSize:25, width:100,color:'#494949', fontWeight:'bold' }}>{paddedPresentReading}</Text>
                                    </View>
                                </View>
                                <View style={{ width:'90%' }}>
                                    <Text style={{ fontSize:16, fontWeight:'bold', color:'#272A37', width:'100%', }}>Total : {reading - previousReading} cu m</Text>
                                </View>
                            </View>
                            <View style={{ padding:10,paddingTop:5, margin:5, width:260, backgroundColor:'#E0E3F3', borderRadius:3, justifyContent:'center', alignItems:'center' }}>
                                <Text style={{ fontSize:18, fontWeight:'bold', color:'#272A37', width:'100%',  }}>Partial Bill : ₱ {present_bill}</Text>
                            </View>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                style={styles.cancel}
                                onPress={() => {
                                    setOpenConfirmSubmit(false)
                                }}>
                                <Text style={{ ...styles.textStyle, color:'white' }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    submitReading(data.consumer_id, reading, imageBase64, `read${data.barangay.replace(/ /g,"").replace("(","").replace(")","").replace("-","")}${data.purok}`);
                                    setReloadHome(!reloadHome)
                                    setOpenConfirmSubmit(false)
                                    navigation.goBack()
                                    }}>
                                <Text style={{ ...styles.textStyle, marginHorizontal:10 }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
     );
}
 
export default ConsumerMeter;