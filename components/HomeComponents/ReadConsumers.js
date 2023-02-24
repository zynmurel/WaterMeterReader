import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {LinearGradient} from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import BaseUrl from "../../Hooks/BaseUrl";
import moment from 'moment';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import ConfirmRemoveModal from "./ConfirmRemoveModal";


const ReadConsumers = ({readerDetails, reloadHome, setReloadHome}) => {
    const getCubicMeters =async()=> {
        const cubic_rates = await AsyncStorage.getItem("cubic_rates")
        //const parsed = JSON.parse(cubicMeters && cubicMeters.data.cubic_rates)
        setCubicMeters(JSON.parse(cubic_rates))
      }
      const [openSubmitted, setOpenSubmitted] = useState(false)
      const [openConfirm, setOpenConfirm] =useState(false)
      const [openNone, setOpenNone] =useState(false)
    const [cubicMeters, setCubicMeters] = useState([])
    const route = useRoute();
    const [buttonDone, setButtonDone] = useState(false)
    const [submittedName, setSubmittedName] = useState({name:"", status:"Wait...", icon:"hourglass-outline", color:"gray"})
    const [submitModalOpen, setSubmitModalOpen] = useState(false)
    const [consumers, setReadConsumers] = useState([])
    const [reload, setReload] = useState(false)
    const readConsumers = consumers.filter((rc)=>(
        rc.is_read===0 && rc.reading_latest !==null
    ))
    const submittedConsumersCount = consumers.filter((rc)=>(
        rc.is_read===1 
    ))
    const { areadata} = route.params;
    const navigation = useNavigation()
    const baseUrl = BaseUrl()
    const date = new Date()
    var dateString = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${'21'} 12:00:00`;
    const timestampNow = moment(date).unix();
    const timestampDueDate = moment(dateString).unix();
    const db = SQLite.openDatabase('ready.db');  
    useEffect(()=>{
        getCubicMeters();
        const getAllData = () => {
            return new Promise((resolve, reject) => {
              db.transaction(tx => {
                tx.executeSql(
                  `SELECT * FROM read${areadata.barangay.replace(/ /g,"").replace("(","").replace(")","").replace("-","")}${areadata.purok}`,
                  null,
                  (txObj, resultSet) => {
                    // handle result set here
                    resolve(resultSet.rows._array);
                  },
                  (txObj, error) => {
                    // handle error here
                    reject(error);
                  }
                );
              });
            });
          };
          getAllData()
            .then(data => {
                setReadConsumers(data)
            })
            .catch(error => {
                console.log(error); // handle the error here
            })
    },[reload])
    console.log(cubicMeters)
    const submitreading = (consumer) => {
        db.transaction(tx => {
            tx.executeSql(
              `UPDATE read${areadata.barangay.replace(/ /g,"").replace("(","").replace(")","").replace("-","")}${areadata.purok} SET is_read = ? WHERE consumer_id = ?`,
              [1, consumer.consumer_id],
              (txObj, resultSet) => {
                console.log(resultSet)
                console.log('Row updated successfully');
              },
              (txObj, error) => {
                console.log('Error while updating row:', error);
              }
            );
          });
    }
    const handleSubmit = () =>{
        setSubmitModalOpen(true)
        setButtonDone(false)
        const headers = { 
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            };
        readConsumers.map((rc, index)=>{
            let present_bill = 0
            const totalReading = (rc.reading_latest - (rc.present_reading===""?0:rc.present_reading))
            let count = submittedConsumersCount.length

        if(rc.usage_type.toLowerCase()==="residential"){
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
        if(rc.usage_type.toLowerCase()==="commercial"){

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

            const reading = {
                reader_id : readerDetails.user_id,
                consumer_id :rc.consumer_id,
                service_period_id :rc.service_period_id_to_be,
                previous_reading :rc.present_reading===""?0:rc.present_reading,
                present_reading :rc.reading_latest,
                reading_date :timestampNow,
                due_date :timestampDueDate,
                proof_image :rc.reading_img,
                present_bill :present_bill
                };
                axios.post(`${baseUrl}/api/storeBillReading`, reading, {headers} )
                .then(function (response) {
                    submitreading(rc)
                    console.log(count++)
                    setSubmittedName({name:`${rc.first_name} ${rc.middle_name} ${rc.last_name}`, status:'Done!', icon:"checkmark-circle", color:"#06B200"})
                })
                .catch(function (error) {
                    console.log(error);
                    setSubmittedName({name:'', status:'Network Error!', icon:'close-circle', color:"#D23100"})
                    
                });

        })
        console.log(`${submittedConsumersCount.length} out of ${consumers.length} Consumer/s Submitted`)
    }
    const styles = StyleSheet.create({
        nav:{
            width:'100%',
            paddingTop:35,
            backgroundColor:'rgb(12,20,52)',
            paddingVertical:10,
            paddingHorizontal:15
        },
        textnav:{
            color:'white',
            fontSize:20,
            fontWeight:'bold',
            marginLeft:10
        },
        eachConsumer:{
            backgroundColor:'white',
            width:'100%',
            paddingVertical:5,
            paddingHorizontal:10,
            justifyContent:'center',
            borderWidth:.5,
            borderColor:'#B6B6B6'
        },
        text1:{
            fontWeight:'bold',
            fontSize:20
        },
        text2:{
            marginTop:-2
        },
        toreadcontainer:{
            marginTop:10,
            width:'100%',
            paddingHorizontal:10
        },
        toreadtext:{
            paddingHorizontal:15,
            paddingVertical:5,
            fontSize:15,
            width:'auto',
            backgroundColor:'#00AE00',
            color:'white',
            borderRadius:3,
            borderTopRightRadius:50,
            width:170,
            marginVertical:5
        },
        warn:{
            color:'green',
            marginTop:110,
            fontSize:20,
            textAlign:'center',
            padding:20,
            borderWidth:2,
            borderColor:'green',
            borderRadius:5

        },
        warn2:{
            color:'gray',
            marginTop:150,
            fontSize:18,
            textAlign:'center',
            padding:20,
            borderWidth:1,
            borderColor:'gray',
            borderRadius:5

        },
        consumerlist:{
            backgroundColor:'green',
            height:450,
            width:'96%',
            marginHorizontal:10,
            marginVertical:0,
            borderRadius:5 ,
            alignItems:'center',
            padding:5
        },
    })
    const eachConsumer = (item) => {
        return (
        <TouchableOpacity
        >
        <LinearGradient colors={['white', 'white', 'white']} style={styles.eachConsumer}>
            <Text style={styles.text1}>{item.consumer_id}</Text>
            <Text style={styles.text2}>{item.first_name} {item.middle_name} {item.last_name}</Text>
        </LinearGradient>
        </TouchableOpacity>
        )
    }
    return ( 
        <View>
            <View style={styles.nav}>
                <View style={{ flexDirection:'row', justifyContent:'flex-start', alignItems:'center' }}>
                <TouchableOpacity style={styles.back} 
                onPress={()=>navigation.goBack()}
                >
                    <Ionicons name="arrow-back-circle-outline" size={40} color={"white"}/>
                </TouchableOpacity>
                <Text style={styles.textnav}>Read Consumer/s</Text>
                </View>
            
            </View>

        <View style={styles.toreadcontainer}>
        <Text style={styles.toreadtext}>Submitted : {submittedConsumersCount.length} / {consumers.length}</Text>
        </View>
        <LinearGradient colors={['white', '#DADADA']} style={styles.consumerlist}>
            {readConsumers.length!==0 &&
            <FlatList
                    style={{ width:'100%', height:'100%' }}
                    data={readConsumers}
                    renderItem={({item}) => {
                        return eachConsumer(item)
                    }}
                    keyExtractor={item => item.consumer_id}
                />}
                { submittedConsumersCount.length === consumers.length  &&
                   <>
                   <Text style={styles.warn}>All Read Consumer/s have already Submitted</Text> 
                   <TouchableOpacity  style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:5, marginTop:20, marginHorizontal:40 }}
                   onPress={()=>{
                       }
                    }>
                    <LinearGradient colors={['#8DCE4D', '#66CD00', '#A7DC72']} style={{ width:'100%', borderRadius:2, justifyContent:'center',flexDirection:'row', alignItems:'center',
                elevation: 1,
                    borderWidth:1,
                    borderColor:'#A7DC72' }}>
                    <Ionicons name="list" color={"white"} size={20} style={{ marginTop:3 }}  />
                        <Text style={{  color:'white', fontSize:14, marginHorizontal:20, textAlign:'center', marginVertical:8, width:180 }}>
                            Submitted Read Consumer/s 
                        </Text>
                    </LinearGradient>
                   </TouchableOpacity>
                   <TouchableOpacity  style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', borderRadius:5, margin:20, marginHorizontal:40 }}
                   onPress={()=>{
                    setOpenConfirm(true)
                       }
                    }>
                    <LinearGradient colors={['#DE8383', '#C33434', '#DE8383']} style={{ width:'100%', borderRadius:2, justifyContent:'center',flexDirection:'row', alignItems:'center',
                elevation: 1,
                    borderWidth:1,
                    borderColor:'#F76F6F' }}>
                    <Ionicons name="trash-outline" color={"white"} size={20} style={{ marginTop:3 }}  />
                        <Text style={{  color:'white', fontSize:14, marginHorizontal:20, textAlign:'center', marginVertical:8, width:180 }}>
                            Delete Barangay Purok
                        </Text>
                    </LinearGradient>
                   </TouchableOpacity>
                   </>
                }
                
            {readConsumers.length===0  && submittedConsumersCount.length !== consumers.length &&
            <Text style={styles.warn2}>No Read Consumer/s to Submit</Text>
            }
        </LinearGradient>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center' }}>

        <TouchableOpacity
        style={{ justifyContent:'center', alignItems:'center',margin:10}}
        onPress={()=>{
            setOpenSubmitted(true)
        }
        }>

        <LinearGradient colors={[ '#29326C', '#121C5C']} style={{ borderRadius:3, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingHorizontal:10 }} >
            <Ionicons name="list-sharp" color={"white"} size={20} />
            <Text style={{   textAlign:'center', padding:10,color:'white', fontSize:14  }}>Submitted Readings</Text>
        </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
        style={{ justifyContent:'center', alignItems:'center',margin:10}}
        disabled={readConsumers.length===0}
        onPress={()=>{
            handleSubmit()}
         }>
            <LinearGradient colors={readConsumers.length===0?['#B9B9B9', '#B9B9B9']:[ '#00B041', '#00A100']} style={{ borderRadius:3, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingHorizontal:10 }} >
            <Ionicons name="send-outline" color={"white"} size={20} />
            <Text style={{  textAlign:'center', padding:10, color:'white', fontSize:14  }}>Submit</Text>
            </LinearGradient>
        </TouchableOpacity>
        </View>
        <Modal
        animationType='fade'
        transparent={true}
        visible={submitModalOpen}
        onRequestClose={() => {
            setSubmitModalOpen(false)
            setReload(!reload)
            }}>
            <View 
            style={{ alignItems:'center', justifyContent:'center', backgroundColor:"rgba(0, 0, 0, 0.61)", height:'100%'  }}>
                <View style={{ width:'80%', backgroundColor:'white', borderRadius:5, alignItems:'center', justifyContent:'center', paddingVertical:30 }}>
                    <Ionicons name={submittedName.icon} size={60} color={submittedName.color}/>
                    <Text style={{ fontSize:24 }}>{submittedName.status}</Text>
                    {submittedName.name!=='' && <Text style={{ fontSize:18 }}>{submittedName.name}</Text>}
                    
                </View>

            </View>

        </Modal>
        <Modal
        animationType='fade'
        transparent={true}
        visible={openSubmitted}
        onRequestClose={() => {
            setOpenSubmitted(false)
            }}>
            <View 
            style={{ alignItems:'center', justifyContent:'center', backgroundColor:"rgba(0, 0, 0, 0.61)", height:'100%'  }}>
                <View style={{ width:'90%', backgroundColor:'white', borderRadius:5, alignItems:'center', justifyContent:'center' }}>
                    <View style={{ width:'100%', backgroundColor: 'rgb(12,20,52)', padding:15, borderTopStartRadius:3, borderTopEndRadius:3, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                        <Text style={{ color:'white', fontSize:18, fontWeight:'bold' }}>Submitted Readings</Text>
                        <TouchableOpacity onPress={()=>
                        setOpenSubmitted(false)}>
                        <Ionicons name="close-circle-outline" size={30} color={"white"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width:'100%', backgroundColor: 'white', padding:10, borderBottomStartRadius:3, borderBottomEndRadius:3}}>
                        <FlatList
                        style={{ width:'100%', maxHeight:500 }}
                        data={submittedConsumersCount}
                        renderItem={({item}) => {
                            return eachConsumer(item)
                        }}
                        keyExtractor={item => item.consumer_id}
                        />
                        {submittedConsumersCount.length===0&&
                        <View style={{ width:'100%', justifyContent:'center', alignItems:'center' }}>
                            <Text>No Submitted Readings</Text>
                        </View>
                        }
                    </View>
                </View>

            </View>

        </Modal>
        <ConfirmRemoveModal
            areadata ={areadata}
            openSettings={openNone}
            setOpenSettings={setOpenNone}
            openConfirm={openConfirm}
            setOpenConfirm={setOpenConfirm}
            reloadHome={reloadHome}
            setReloadHome={setReloadHome}
            />
        </View>
     );
}
 
export default ReadConsumers;