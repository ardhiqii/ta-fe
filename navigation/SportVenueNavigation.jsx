import { LEXEND } from "@fonts/LEXEND";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditManageSportScreen from "@screens/SportVenue/Admin/EditManageSportScreen";
import ListSportVenuesScreen from "@screens/SportVenue/Admin/ListSportVenuesScreen";
import ManageBlacklistSchedule from "@screens/SportVenue/Admin/ManageBlacklistSchedule";
import OrderReviewScreen from "@screens/SportVenue/OrderReviewScreen";
import OrderReview from "@screens/SportVenue/OrderReviewScreen";
import SportVenueScreen from "@screens/SportVenue/SportVenueScreen";
import { COLOR } from "COLOR";

const Stack = createNativeStackNavigator();

const SportVenueNavigation = () => {
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
        name="ListSportVenueAdmin"
        component={ListSportVenuesScreen}
        options={{ headerTitle: "Your Sport Venue" }}
      />
      <Stack.Screen
        name="SportVenueScreen"
        component={SportVenueScreen}
        options={{ headerTitle: "Sport Venue" }}
        initialParams={{ editMode: false }}
      />
      <Stack.Screen
        name="ManageSportVenueAdmin"
        component={SportVenueScreen}
        options={{ headerTitle: "Manage Sport Venue" }}
        initialParams={{ editMode: true }}
      />
      <Stack.Screen
        name="EditManageSportVenueAdmin"
        component={EditManageSportScreen}
        options={{ headerTitle: "Manage Sport Venue" }}
      />
      <Stack.Screen
        name="ManageBlacklistSchedule"
        component={ManageBlacklistSchedule}
        options={{ headerTitle: "Manage Blacklist" }}
      />
      <Stack.Screen
        name="OrderReviewScreen"
        component={OrderReviewScreen}
        options={{ headerTitle: "Order Review" }}
      />
    </Stack.Navigator>
  );
};

export default SportVenueNavigation;
