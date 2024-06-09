import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "@screens/LoginScreen";
import RegisterScreen from "@screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
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
import TransactionNavigation from "./TransactionNavigation";
import FindReservationScreen from "@screens/FindReservation/FindReservationScreen";
import ReservationAdminScreen from "@screens/ReservationAdmin/ReservationAdminScreen";
import ReservationAdminNavigation from "./ReservationAdminNavigation";
import MatchNavigation from "./MatchNavigation";

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
  const { user } = useContext(UserContext);
  const isUserAdmin = user?.role === "admin";
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
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SportVenueNavigation"
        component={SportVenueNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TransactionNavigation"
        component={TransactionNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ReservationAdminNavigation"
        component={ReservationAdminNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MatchNavigation"
        component={MatchNavigation}
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
  const { user } = useContext(UserContext);
  const isUserAdmin = user?.role === "admin";
  return (
    <>
      <BottomTab.Navigator sceneContainerStyle={{ backgroundColor: "white" }}>
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        {isUserAdmin && <>
        <BottomTab.Screen
          name="Reservation"
          component={ReservationAdminScreen}
          options={{
            title: "Reservation",
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
        </>}
        {!isUserAdmin && (
          <>
            <BottomTab.Screen
              name="FindReservationScreen"
              component={FindReservationScreen}
              options={{
                title: "Find Reservation",
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
            <BottomTab.Screen
              name="TransactionScreen"
              component={TransactionScreen}
              options={{
                title: "Reservation",
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
          </>
        )}
      </BottomTab.Navigator>
    </>
  );
};

const Navigation = () => {
  const { user } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user?.token);

  useEffect(() => {
    setIsAuthenticated(!!user?.token);
  }, [user?.token]);
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthNavigation />}
      {isAuthenticated && <AuthenticatedNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
