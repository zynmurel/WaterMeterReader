import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { Alert } from 'react-native';
const Login = () => {
    const [ email ,setEmail ] = useState('')
    const [ password ,setPassword ] = useState('')
    const [eye, setEye] = useState(true)
    const [alertErrorEmail, setAlertErrorEmail ] = useState(false)
    const [alertErrorPassword, setAlertErrorPassword ] = useState(false)

    const inputEmail = (text) => {
        setEmail(text)
        setAlertErrorEmail(false)
    }
    const inputPassword = (text) => {
        setPassword(text)
        setAlertErrorPassword(false)
    }

    const login =()=> {
      if(email===""){
        Alert.alert("Email Error!", "Please input email.",[
          {text:"Undestood", onPress: ()=> {console.log("Maui")}}
        ])
        setAlertErrorEmail(true)
    }else if(password===""){
      Alert.alert("Password Error!", "Please input password.",[
        {text:"Undestood", onPress: ()=> {console.log("Maui")}}
      ])
      setAlertErrorPassword(true)
  }
    }

    const toggleEye = () => {
        setEye(eye? false:true)
    }

    return ( 
      
      <View style={styles.login}>
      <Text style={styles.text1}>BALILIHAN</Text>
      <Text style={styles.text2}>WATERWORKS</Text>
 
    <View style={{ ...styles.emailContainer, borderColor: alertErrorEmail? 'red':'black' }}>
      <Ionicons style={{ width:26 }} name={"mail"} size={22} color="#333333" />
      <TextInput
        placeholder='Email' 
        style={{ ...styles.email }}
        onChangeText={inputEmail}
        />

      <TouchableOpacity onPress={toggleEye}>
      </TouchableOpacity>
    </View>

    <View style={{ ...styles.passwordContainer, borderColor: alertErrorPassword? 'red':'black'  }}>
      <Ionicons style={{ width:26 }} name={"lock-closed"} size={24} color="#333333" />
      <TextInput
        placeholder='Password' 
        style={{ ...styles.email }}
        onChangeText={inputPassword}
        secureTextEntry={eye}
        />

      <TouchableOpacity onPress={toggleEye}>
      <Ionicons name={eye? "eye-off":"eye"} size={25} color="gray" />
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={login} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText} >{"Login"}</Text>
    </TouchableOpacity>
    </View>
    
     );
}

const styles = StyleSheet.create({

  login: {
    backgroundColor:'white',
    width:"90%",
    height:400,
    borderRadius:20,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:'center'
  },
  text1:{
    fontSize:50,
    fontWeight:'900',
  },
  text2:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:-10
  },
  email:{
    width:'78%',
    height:50,
    fontSize:15,
  },
  emailContainer:{
    borderWidth:1,
    borderColor:'black',
    borderRadius:5,
    width:'85%',
    height:50,
    marginTop:10,
    paddingHorizontal:10,
    fontSize:18,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  password:{
    width:'78%',
    height:50,
    fontSize:15,
  },
  passwordContainer:{
    borderWidth:1,
    borderColor:'black',
    borderRadius:5,
    width:'85%',
    height:50,
    marginTop:10,
    paddingHorizontal:10,
    fontSize:18,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  button:{
    margin:20
  },
  buttonContainer:{
    margin:10,
    width:"70%",
    height:"20%",
    borderRadius:200
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "rgb(12,20,52)",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 100,
    margin:15,
  },
  appButtonText: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"rgb(12,20,52)"
  },
})
 
export default Login;