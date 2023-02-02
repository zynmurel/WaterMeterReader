import { StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './components/Login';
import AntDesign from '@expo/vector-icons/AntDesign'
import Home from './components/Home';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login/> */}
      <Home/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"rgb(12,30,50)"
  },
});
