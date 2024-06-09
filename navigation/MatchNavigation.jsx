import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import MatchScreen from "@screens/Match/MatchScreen";
const Stack = createNativeStackNavigator();

const MatchNavigation = () => {
  return(
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
    <Stack.Screen name="MatchScreen" component={MatchScreen} />
  </Stack.Navigator>);
};

export default MatchNavigation;
