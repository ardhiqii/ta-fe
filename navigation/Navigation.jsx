import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "@screens/LoginScreen";
import RegisterScreen from "@screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { UserContext } from "store/user-contex";
import HomeScreen from "@screens/Home/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import MainMenu from "@screens/MainMenu";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

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
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{
        headerShown:false,
      }} />
      <Stack.Screen name="MainMenu" component={MainMenu} options={{presentation:"modal",animation:"slide_from_bottom"}}  />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <>
    <BottomTab.Navigator sceneContainerStyle={{backgroundColor:"white"}}>
      <BottomTab.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
    </BottomTab.Navigator>
    </>
  );
};

const Navigation = () => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user.token != undefined;

  return (
    <NavigationContainer>
      {/* {!isAuthenticated && <AuthNavigation />}
      {isAuthenticated && <AuthenticatedNavigation />} */}
      
      <AuthenticatedNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
