import { View, Image, TouchableOpacity, Text, Modal } from "react-native";
import { Camera } from "expo-camera";
import { Entypo, Ionicons } from '@expo/vector-icons';
import { CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library'
import { StyleSheet } from "react-native";
import React , { useState, useEffect } from "react";
import CameraButton from "./CameraButton";
import { useNavigation } from "@react-navigation/native";

const CameraController = ({openCam, setOpenCam, image, setImage, cameraRef, imageBase64, setImageBase64}) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
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
        },
        camera:{
            height:480,
            borderWidth:1,
            borderColor:'white'
        },
        buttonContainerTop:{
            height:70,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:15,
            flexDirection:'row',
            justifyContent:'space-between'
        },
        buttonContainerBottom:{
            height:100,
            justifyContent:'center'
        },
    })
    const takeAPhoto= async()=>{
    //     if(cameraRef){
    //         try{
    //             const data = await cameraRef.current.takePictureAsync();
    //             console.log(data)
    //             setImage(data.uri)
    //         } catch(e){
    //         console.log(e)
    //     }
    // }
    if (cameraRef.current) {
        const options = {
          quality: 0.1,
          pictureSize: '240x240',
          base64:true,
        };
        const data = await cameraRef.current.takePictureAsync(options);
        const base64 = data.base64;
        setImage(data.uri);
        setImageBase64(base64)
      }
}

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
        <Modal
        animationType='slide'
        transparent={true}
        visible={openCam}
        onRequestClose={() => {
            setOpenCam(!openCam);
            }}>
            <View style={styles.container}>
        <View style={styles.buttonContainerTop}>
                <TouchableOpacity onPress={()=>{
                    setOpenCam(false)
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
            {!image ?
            <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
            >
            </Camera>:
            <Image source={{ uri:image }} style={styles.camera}/>
            }
            <View style={styles.buttonContainerBottom}>
                {image ? 
                <View
                style={{ 
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal:30
                 }}>
                <CameraButton title={"Re-take"} icon={"refresh-circle"} color={"orange"} onPress={()=>setImage(null)}/>
                <CameraButton title={"Done"} icon={"checkmark-circle"} color={"rgba(0, 180, 4, 1)"} 
                onPress={()=>{
                    setOpenCam(false)
                    }}/>
                </View>
                :
                <View style={{ justifyContent:'center', alignItems:'center' }}>
                    <CameraButton title={"Take a photo"} icon={"camera"} color={"orange"} onPress={takeAPhoto}/>
                </View>
                    }
            </View>
        </View>
        </Modal>
     );
}
 
export default CameraController;