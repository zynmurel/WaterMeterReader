import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Body from "./HomeComponents/Body";
import Nav from "./HomeComponents/Nav";
import { useEffect, useState, useRef } from "react";
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons, Entypo } from '@expo/vector-icons';

const Home = ({reloadHome, setReloadHome, setIsLogin}) => {
    const [data , setData] = useState([])
    const [reloadGenerated, setReloadGenerated] = useState(true)
    const [openProfile, setOpenProfile]= useState(false);
    const [readerDetails , setReaderDetails] = useState({user_id:'', user_email:''})
    const db = SQLite.openDatabase("ready.db")

    const logout = async() => {
      AsyncStorage.setItem("user_type","")
      AsyncStorage.setItem("user_token","")
      AsyncStorage.setItem("user_email","")
      AsyncStorage.setItem("user_id","")
      setIsLogin(false)
      const token = await AsyncStorage.getItem("user_token")
      console.log(token)
    }
    const getReader =async()=> {
      const token = await AsyncStorage.getItem("user_token")
      const user_id = await AsyncStorage.getItem("user_id")
      const user_email = await AsyncStorage.getItem("user_email")
      setReaderDetails({user_id:user_id, user_email:user_email})
      console.log(token)
    }

    useEffect(()=>{
        const executeSqlWithPromise = (tx, sql, params) => {
          return new Promise((resolve, reject) => {
            tx.executeSql(
              sql,
              params,
              (_, result) => resolve(result),
              (_, error) => reject(error)
            );
          });
        };
        
        db.transaction(tx => {
          executeSqlWithPromise(tx, 'SELECT name FROM sqlite_master WHERE type="table";', [])
            .then(({ rows }) => {
              const tableNames = [];
              for (let i = 0; i < rows.length; i++) {
                if(rows.item(i).name.includes("read")){
                  tableNames.push({name: rows.item(i).name});
                }
              }
              const fetchData = async () => {
                const dataArr = [];
                for (const tbn of tableNames) {
                  try {
                    await new Promise((resolve, reject) => {
                      db.transaction(tx => {
                        tx.executeSql(
                          `SELECT * FROM ${tbn.name}`,
                          [],
                          (_, resultSet) => {
                            tbn.barangay = resultSet.rows._array[0].barangay;
                            tbn.purok = resultSet.rows._array[0].purok;
                            tbn.totalConsumer = resultSet.rows._array.length;
                            tbn.id = resultSet.rows._array[0].barangay+resultSet.rows._array[0].purok
                            tbn.totalReaded = 0
                            tbn.data = resultSet.rows._array
                            resultSet.rows._array.forEach((t)=>{
                                if(t.reading_latest!==null){
                                  tbn.totalReaded++
                                }
                            })
                            dataArr.push(tbn);
                            resolve();
                          },
                          (_, error) => {
                            reject(error);
                          }
                        );
                      });
                    });
                  } catch (error) {
                    console.error(error);
                  }
                }
                setData(dataArr);
              };
                  async function getData() {
                    try {
                      const data = await fetchData();
                    } catch (error) {
                      console.error(error);
                    }
                  }
                  
              getData()
              getReader()
            })
            .catch(error => console.error(error));
        });
    },[reloadGenerated, reloadHome])
    

    return ( 
        <>
         <View style={styles.home}>
            <Nav
            setIsLogin={setIsLogin}
            setOpenProfile={setOpenProfile}
            openProfile={openProfile}
            />
            <Body 
            db={db} 
            data={data}
            reloadGenerated={reloadGenerated} 
            setReloadGenerated={setReloadGenerated}
            />
            <Modal
            animationType='fade'
            transparent={true}
            visible={openProfile}
            onRequestClose={() => {
                setOpenProfile(!openProfile)
                }}
            >
                <View style={{ alignItems:'center', justifyContent:'center', flex:1, backgroundColor:'rgba(0,0,0,.8)' }}>
                    <View style={styles.profileContainer}>
                      <TouchableOpacity style={styles.closeProfile} onPress={()=>setOpenProfile(false)}>
                        <Ionicons name="close-circle-outline" size={30} color={"black"} />
                      </TouchableOpacity>
                          <Ionicons name="person-circle-outline" size={60} color={"black"} style={{marginTop:-10}}/>
                      <Text style={styles.readerIdText}>Reader ID - {readerDetails.user_id}</Text>
                      <View style={styles.readerDetails}>
                        <View style={styles.readerDetailsContainer}>
                          <Ionicons name="mail-outline" size={20} color={"black"} style={styles.icon} />
                          <Text style={styles.readerEmailText}>Email : {readerDetails.user_email}</Text>
                        </View>
                        <View style={styles.readerDetailsContainer} >
                          <Ionicons name="mail-outline" size={20} color={"black"} style={styles.icon} />
                          <Text style={styles.readerEmailText}>Email : {readerDetails.user_email}</Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={()=>logout()} style={styles.logoutbutton}>
                        <Text style={styles.logouttext}>Logout</Text>
                      </TouchableOpacity>
                    </View>
                </View>
            </Modal>
         </View>
        </>
     );
}

const styles = StyleSheet.create({
    home:{
        flex:1,
        backgroundColor:'white',
        width:"100%",
        alignItems:'center'
    },
    profileContainer:{
      backgroundColor:'white',
      padding:20,
      paddingTop:0,
      borderRadius:5,
      width:'80%',
      alignItems:'center',
      justifyContent:'center'
    },
    logoutbutton:{
      width:150,
      padding:10,
      backgroundColor:'#D70000',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:20,
      marginVertical:10
    },
    logouttext:{
      color:'white'
    },
    readerIdText:{
      fontSize:25,
      fontWeight:'bold'
    },
    readerDetailsContainer:{
      marginVertical:2,
      flexDirection:'row',
      alignItems:'center'
    },
    readerEmailText:{
      fontSize:14
    },
    readerDetails:{
      marginVertical:10,
      width:'85%',
    },
    icon:{
      width:20,
      marginRight:5
    },
    closeProfile:{
      width:'100%',
      alignItems:'flex-end',
      marginTop:10,
      marginRight:-10
    }
})
 
export default Home;