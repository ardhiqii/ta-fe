import { LEXEND } from "@fonts/LEXEND";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListSportVenuesScreen from "@screens/SportVenue/Admin/ListSportVenuesScreen";
import ManageSportVenueScreen from "@screens/SportVenue/Admin/ManageSportVenueScreen";
import { COLOR } from "COLOR";

const Stack = createNativeStackNavigator();

const SportVenueNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible:false,
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
        name="ListSportVenueAdmin"
        component={ListSportVenuesScreen}
        options={{ headerTitle: "Your Sport Venue" }}
      />
      <Stack.Screen
        name="ManageSportVenueAdmin"
        component={ManageSportVenueScreen}
        options={{ headerTitle: "Manage Sport Venue" }}
      />
    </Stack.Navigator>
  );
};

export default SportVenueNavigation;
