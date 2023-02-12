import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
const ToGenerateModal = ({
  modalVisible, 
  toRead, 
  toReadError, 
  toReadIsPending, 
  barangay, 
  purok, 
  setModalVisible, 
  db, 
  toReadReload,
  generated,
  reloadGenerated, 
  setReloadGenerated}) => {
    const [activeGenerate, setActiveGenerate] = useState(false)
    useEffect(()=>{
      let x= false
      generated.forEach((gen)=>{
        if(gen.name === `read${barangay.replace(" ","")}${purok}`){
          x = true
        }
      })
      setActiveGenerate(x)
    },[toReadReload])
    const onGenerate =() => {
        db.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS read${barangay.replace(" ","")}${purok} (consumer_id TEXT, first_name TEXT, middle_name TEXT, last_name TEXT, gender TEXT, phone TEXT, barangay, TEXT, purok TEXT, service_period_id_to_be INTEGER, service_period TEXT, reading_id INTEGER, previous_reading INTEGER, present_reading INTEGER, reading_date INTEGER, reading_latest INTEGER, reading_img TEXT)`)  
        });

        // db.transaction(tx => {
        //     tx.executeSql('SELECT * FROM sampleBarangay', null,
        //     (txObj, resultSet) => console.log(resultSet.rows._array),
        //     (txObj, error) => console.log(error)
        //     )
        // })
          
         db.transaction(tx => {
            toRead.forEach(con=> {
              tx.executeSql(
                `INSERT INTO read${barangay.replace(" ","")}${purok} (consumer_id, first_name, middle_name, last_name, gender, phone, barangay, purok , service_period_id_to_be , service_period , reading_id , previous_reading , present_reading , reading_date , reading_latest , reading_img) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ? , ? , ? , ? , ? , ? , ? , ?);`,
                [con.consumer_id, con.first_name, con.middle_name, con.last_name, con.gender, con.phone, con.barangay, con.purok, con.service_period_id_to_be, con.service_period, con.reading_id, con.previous_reading, con.present_reading, con.reading_date, con.reading_latest, con.reading_img ]
              );
            });
          });

    }
    const styles = {
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
            backgroundColor:"rgba(0, 0, 0, 0.61)"
          },
          modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 5,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width:"90%"
          },
          button: {
            borderRadius: 5,
            padding: 10,
            elevation: 2,
          },
          buttonClose: {
            backgroundColor: toReadIsPending || (toRead && toRead.length===0) || generated.length>=5 ||activeGenerate? 'rgba(173, 173, 173, 1)':'#27B735',
          },
          textStyle: {
            color: 'white',
            textAlign: 'center',
            fontSize:18
          },
          modalBarangay: {
            textAlign: 'center',
            fontWeight:"900",
            fontSize:30,
            color:'white'
          },
          modalPurok: {
            textAlign: 'center',
            fontWeight:'600',
            fontSize:18,
            color:'white'
          },
          cancel:{
            backgroundColor:'rgba(136, 136, 136, 1)',
            borderRadius: 5,
            padding: 10,
            elevation: 2,
            marginHorizontal:10
          },
          buttonsContainer:{
            flexDirection:'row',
            width:'100%',
            justifyContent:'flex-end',
            padding:10
          },
          contentText:{
            fontSize:22,
            
          },
          content:{
            width:'100%', 
            alignItems:'center', 
            marginHorizontal:20,
            height:120,
            justifyContent:'center'
          },
          alerttext:{
            fontSize:12
          }
    }
    return ( 
    <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <View style={{ width:'100%',  backgroundColor: 'rgb(12,20,52)', padding: 10, borderTopLeftRadius:5, borderTopEndRadius:5 }}>
            <Text style={styles.modalBarangay}>{`${barangay}`}</Text>
            <Text style={styles.modalPurok}>{` Purok ${purok} `}</Text>
            </View>

            <View style={styles.content}>
            {!toReadIsPending && toRead && 
            <View style={{ flexDirection:'column', alignItems:'center' }}>
            <Ionicons name="people" color={"white"} size={30} style={{ backgroundColor:'rgb(12,20,52)', padding:10, borderRadius:40}}/>
            <Text style={{ ...styles.contentText, }}>
                {`${toRead.length} Consumer/s`}
            </Text>
            
            </View>}
            {activeGenerate && !toReadIsPending &&
              <Text style={{ ...styles.alerttext, }}>
                ( This Barangay's Purok is already generated )
            </Text>
            }
            {toReadIsPending && 
            <Text style={{ ...styles.contentText, }}>
                Fetching...
            </Text>}
            {toReadError && 
            <Text style={{ ...styles.contentText, }}>
                Fetching failed.
            </Text>}
            </View>
            
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                style={styles.cancel}
                onPress={() => {setModalVisible(!modalVisible)
                    // db.transaction(tx => {
                    //     tx.executeSql(
                    //       'DROP TABLE IF EXISTS toRead;'
                    //     );
                    //   });
                }}>
                <Text style={{ ...styles.textStyle, color:'white' }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                disabled={toReadIsPending || (toRead && toRead.length===0) || generated.length>=5 || activeGenerate ? true:false}
                onPress={() => {
                    setModalVisible(!modalVisible)
                    onGenerate()
                    setReloadGenerated(reloadGenerated?false:true)
                    }}>
                <Text style={styles.textStyle}>Generate</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    </Modal> );
}
 
export default ToGenerateModal;