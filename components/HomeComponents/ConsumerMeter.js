import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


const ConsumerMeter = ({
    reading,
    setReading,
    previousReading
}) => {
    const navigation = useNavigation()
    const [plus, setPlus] = useState(1)
    const [disableSubtract, setDisableSubtract] = useState(true)
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
    let paddedPresentReading = reading.toString().padStart(5, "0").split("");
    let paddedPreviousReading = previousReading.toString().padStart(5, "0").split("");
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
            paddingHorizontal:10,
            paddingVertical:0,
            margin:3,
            marginHorizontal:3,
            borderRadius:2,
            backgroundColor:'white',
        },
        prsntdigit:{
            fontSize:30,
            fontWeight:'bold',
            color:'rgba(40, 42, 77, 1)',
        },
        mcubeprsnt:{
            position:'absolute',
            fontSize:20,
            right:10,
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
            margin:20,
        },
        cam:{
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            flex:1
        },
        camtext:{
            margin:5,
            fontWeight:'bold',
            fontSize:13,
            color:'rgba(45, 45, 45, 1)'
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
                            <LinearGradient colors={disableSubtract?['rgba(218, 218, 218, 1)','rgba(186, 186, 186, 1)']:['rgba(255, 213, 130, 1)', 'rgba(255, 192, 66, 1)', 'rgba(255, 170, 0, 1)']} style={{borderRadius:6}}>
                                <Ionicons name="remove-outline" size={30} color={"white"} style={{ margin:5 }} />
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.plus} onPress={addCubicMeter}>
                            <LinearGradient colors={['rgba(255, 213, 130, 1)', 'rgba(255, 192, 66, 1)', 'rgba(255, 170, 0, 1)']} style={{borderRadius:6}}>
                                <Ionicons name="add-outline" size={30} color={"white"} style={{ margin:5 }}/>
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>
                            <Text style={styles.prsnttext}>Proof of Reading</Text>
                <View style={styles.presentContainer}>
                    <View style={styles.presentReading}>
                    </View>

                    <View style={styles.camcontroller}>
                        <View style={styles.cam}>
                            <Text style={styles.camtext}>Take a Photo</Text>
                            <TouchableOpacity onPress={()=>navigation.navigate("Camera")} style={styles.camiconcontainer}>
                                <LinearGradient colors={['rgba(255, 213, 130, 1)', 'rgba(255, 192, 66, 1)', 'rgba(255, 170, 0, 1)']} style={styles.camicon}>
                                    <Ionicons name="camera-outline" size={30} color={"white"} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cam}>
                            <Text>Take a Photo</Text>
                            <TouchableOpacity onPress={subtractCubicMeter} style={styles.camiconcontainer}>
                                <LinearGradient colors={['rgba(255, 213, 130, 1)', 'rgba(255, 192, 66, 1)', 'rgba(255, 170, 0, 1)']} style={styles.camicon}>
                                    <Ionicons name="camera-outline" size={30} color={"white"} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            <View style={styles.camera}>

            </View>

        </View>
     );
}
 
export default ConsumerMeter;