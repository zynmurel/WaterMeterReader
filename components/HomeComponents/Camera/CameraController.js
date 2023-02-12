import { View, Image, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import { StyleSheet } from "react-native";
import React , { useState, useEffect, useRef } from "react";
import CameraButton from "./CameraButton";
import { useNavigation } from "@react-navigation/native";
import * as ImageManipulator from 'expo-image-manipulator';

const CameraController = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const cameraRef = useRef(null)
    const navigation = useNavigation()

    useEffect(()=>{
        (async()=>{
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'black',
            backgroundColor:'rgb(12,20,52)',
            paddingTop:28
        },
        camera:{
            height:550,
            borderWidth:1,
            borderColor:'white'
        },
        buttonContainerTop:{
            height:50,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:15,
            flexDirection:'row',
            justifyContent:'space-between'
        },
        buttonContainerBottom:{
            height:70,
            justifyContent:'center'
        },
    })
    const takeAPhoto= async()=>{
        if(cameraRef){
            try{
                const data = await cameraRef.current.takePictureAsync();
                console.log(data)
                setImage(data.uri)
            } catch(e){
            console.log(e)
        }
    }}

    const savePhoto = async () => {
        if(image){
            try{
                await MediaLibrary.createAssetAsync(image)
                alert("Saved!")
                setImage(null)
            }catch(e){
                console.log(e)
            }
        }
    }
    if(hasCameraPermission=== false){
        return <Text>You have no access to the camera</Text>
    }
    return ( 
        <View style={styles.container}>
        <View style={styles.buttonContainerTop}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}
                style={{ marginRight:10 }}
                >
                    <Ionicons name={"arrow-back-circle-outline"} size={30} color={"white"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    setFlash(flash === Camera.Constants.FlashMode.off ?Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
                }}
                style={{ marginRight:10 }}
                >
                    <Ionicons name={"flash-sharp"} size={22} color={flash === Camera.Constants.FlashMode.off?"gray":"orange"}/>
                </TouchableOpacity>
        </View>
            {!image ?<Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
            >
                <Text>Hello</Text>
            </Camera>:
            <Image source={{ uri:image }} style={styles.camera}/>
            }
            <View style={styles.buttonContainerBottom}>
                {image ? 
                <View
                style={{ 
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal:50
                 }}>
                <CameraButton title={"Re-take"} icon={"refresh-circle"} color={"orange"} onPress={()=>setImage(null)}/>
                <CameraButton title={"Save"} icon={"checkmark-circle"} color={"rgba(0, 180, 4, 1)"} onPress={savePhoto}/>
                </View>
                :
                <View style={{ justifyContent:'center', alignItems:'center' }}>
                    <CameraButton title={"Take a photo"} icon={"camera"} color={"orange"} onPress={takeAPhoto}/>
                </View>
                    }
            </View>
        </View>
     );
}
 
export default CameraController;