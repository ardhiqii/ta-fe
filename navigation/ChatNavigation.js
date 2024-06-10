import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import ChatsScreen from "@screens/Chats/ChatsScreen";
import ChatScreen from "@screens/Chats/ChatScreen";
const Stack = createNativeStackNavigator();

const ChatNavigation = () => {
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
    <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
  </Stack.Navigator>);
};

export default ChatNavigation;
