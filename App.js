import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  LexendDeca_400Regular,
  LexendDeca_700Bold,
  LexendDeca_900Black,
} from "@expo-google-fonts/lexend-deca";
import { LEXEND } from "@fonts/LEXEND";
import LoginScreen from "@screens/LoginScreen";
import UserContextProvider, { UserContext } from "store/user-contex";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@screens/Home/HomeScreen";
import { useContext, useEffect } from "react";
import RegisterScreen from "@screens/RegisterScreen";
import { virtualId } from "util/virtual_id";

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const AuthenticatedNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user.token != undefined;

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthNavigation />}
      {isAuthenticated && <AuthenticatedNavigation />}
    </NavigationContainer>
  );
};

export default function App() {
  let [fontsloaded] = useFonts({
    LexendDeca_400Regular,
    LexendDeca_700Bold,
    LexendDeca_900Black,
  });

  useEffect(() => {
    const checkingVirtualId = async () => {
      const id = await virtualId.getLocal();
      if (id == null) {
        const { data } = await virtualId.getVirtualId();
        const newId = data.virtual_device_id;
        await virtualId.storeLocal(newId);
      } else {
        console.log("APP");
        console.log(id);
      }
    };
    checkingVirtualId();
  }, []);

  if (!fontsloaded) {
    return (
      <View>
        <Text>WAITING FONT</Text>
      </View>
    );
  }

  return (
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: LEXEND.Black,
  },
});
