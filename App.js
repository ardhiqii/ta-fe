import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts,LexendDeca_400Regular} from '@expo-google-fonts/lexend-deca';
export default function App() {
  let[fontsloaded]= useFonts({
    LexendDeca_400Regular,
  })
  if(!fontsloaded){
    return <View><Text>WAITING FONT</Text></View>
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontFamily:"LexendDeca_400Regular"
  }
});
