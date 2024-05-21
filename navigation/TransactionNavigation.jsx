const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();

import { LEXEND } from "@fonts/LEXEND";
import TransactionByIdScreen from "@screens/Transaction/TransactionByIdScreen";
import { COLOR } from "COLOR";
import React from "react";

const TransactionNavigation = () => {
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
      <Stack.Screen name="TransactionByIdScreen"
      options={{title:'Reservation'}} component={TransactionByIdScreen}/>
    </Stack.Navigator>
  );
};

export default TransactionNavigation;
