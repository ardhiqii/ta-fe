const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();

import { LEXEND } from "@fonts/LEXEND";
import ListReservationAdminByIdScreen from "@screens/ReservationAdmin/ListReservationAdminByIdScreen";
import ReservationAdminByIdScreen from "@screens/ReservationAdmin/ReservationAdminByIdScreen";

import { COLOR } from "COLOR";

import React from "react";

const ReservationAdminNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
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
    >
      <Stack.Screen
        name="ReservationByIdVenueScreen"
        component={ListReservationAdminByIdScreen}
        options={{ title: "List Reservation" }}
      />
      <Stack.Screen
        name="ReservationByIdScreen"
        component={ReservationAdminByIdScreen}
      />
    </Stack.Navigator>
  );
};

export default ReservationAdminNavigation;
