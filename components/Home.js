import { Text, View, StyleSheet } from "react-native";
import Body from "./HomeComponents/Body";
import Nav from "./HomeComponents/Nav";
import { useEffect, useState, useRef } from "react";
import * as SQLite from 'expo-sqlite'

const Home = ({reloadHome, setReloadHome, setIsLogin}) => {
    const [data , setData] = useState([])
    const [reloadGenerated, setReloadGenerated] = useState(true)
    const db = SQLite.openDatabase("ready.db")
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
            })
            .catch(error => console.error(error));
        });
    },[reloadGenerated, reloadHome])
    

    return ( 
        <>
         <View style={styles.home}>
            <Nav
            setIsLogin={setIsLogin}/>
            <Body 
            db={db} 
            data={data}
            reloadGenerated={reloadGenerated} 
            setReloadGenerated={setReloadGenerated}
            />
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
    }
})
 
export default Home;