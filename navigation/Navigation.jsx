import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "@screens/LoginScreen";
import RegisterScreen from "@screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { UserContext } from "store/user-contex";
import HomeScreen from "@screens/Home/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import MainMenu from "@screens/MainMenuScreen";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import SportVenueNavigation from "./SportVenueNavigation";
import MapScreen from "@screens/MapScreen";
import SearchScreen from "@screens/SearchScreen";
import TransactionScreen from "@screens/Transaction/TransactionScreen";

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
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainMenu"
        component={MainMenu}
        options={{
          animation: "slide_from_bottom",
          headerStyle: {
            backgroundColor: COLOR.base900,
          },
          headerTitleStyle: {
            fontFamily: LEXEND.SemiBold,
            fontSize: 28,
            color: "white",
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}} />
      <Stack.Screen
        name="SportVenueNavigation"
        component={SportVenueNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLOR.base900,
          },
          headerTitleStyle: {
            fontFamily: LEXEND.SemiBold,
            fontSize: 28,
            color: "white",
          },
          headerTintColor: "white",
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <>
      <BottomTab.Navigator sceneContainerStyle={{ backgroundColor: "white" }}>
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <BottomTab.Screen name="TransactionScreen" component={TransactionScreen} options={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: COLOR.base900,
        },
        headerTitleStyle: {
          fontFamily: LEXEND.SemiBold,
          fontSize: 28,
          color: "white",
        },
        headerTintColor: "white",
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "white",
        },
      }} />
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
