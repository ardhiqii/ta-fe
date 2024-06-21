import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  LexendDeca_300Light,
  LexendDeca_400Regular,
  LexendDeca_700Bold,
  LexendDeca_900Black,
  LexendDeca_600SemiBold,
} from "@expo-google-fonts/lexend-deca";
import { LEXEND } from "@fonts/LEXEND";
import UserContextProvider, { UserContext } from "store/user-contex";
import { useCallback, useContext, useEffect, useState } from "react";
import { virtualId } from "util/virtual_id";
import { Token } from "util/token";
import { relogin } from "util/auth/auth";
import Navigation from "navigation/Navigation";
import { Role } from "util/role";
import ChatsContextProvider from "store/chats-context";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Root = () => {
  let [fontsloaded] = useFonts({
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_900Black,
  });
  const [appReady, setAppReady] = useState(false);
  const { updateUser, user } = useContext(UserContext);
  const [virtual, setVirtual] = useState("");
  const [checking, setChecking] = useState({
    virtual: false,
    token: false,
    role: false,
    user: false,
  });

  const checkingVirtualId = async () => {
    console.log("============================");
    let id = await virtualId.getLocal();
    if (id == null) {
      const { data } = await virtualId.getVirtualId();
      const newId = data.virtual_device_id;
      id = newId;
      await virtualId.storeLocal(newId);
    }
    console.log("Checking Virtual ID is done");
    setVirtual(id);
    setChecking((prev) => {
      return { ...prev, virtual: true };
    });
    console.log(id);
    console.log("============================");
    return id;
  };

  const checkingToken = async () => {
    console.log("============================");
    let token = await Token.getLocal();
    console.log("Checking Token is done");
    console.log(token);
    setChecking((prev) => {
      return { ...prev, token: true };
    });
    console.log("============================");
    return token;
  };

  const checkingRole = async () => {
    console.log("============================");
    let role = await Role.getLocal();
    console.log("Checking role is done");
    console.log(role);
    setChecking((prev) => {
      return { ...prev, role: true };
    });
    console.log("============================");
    return role;
  };

  const checkingUser = async (token, role) => {
    console.log("============================");
    try {
      const { data } = await relogin(token, role);
      if (data) {
        data["token"] = token;
        data["role"] = role;
        updateUser(data);
      }
    } catch (e) {
      console.log("Failed relogin using token");
      Token.removeLocal();
      Role.removeLocal();
    }
    console.log("Checking user is done");
    setChecking((prev) => {
      return { ...prev, user: true };
    });
    console.log("============================");
  };

  useEffect(() => {
    setAppReady(false);
    const initializedApp = async () => {
      const [id, token, role] = await Promise.all([
        checkingVirtualId(),
        checkingToken(),
        checkingRole(),
      ]);

      await checkingUser(token, role);
      if (token !== null) {
      }
      setAppReady(true);
    };
    initializedApp();
  }, []);

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (appReady && fontsloaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [appReady, fontsloaded]);

  if (!fontsloaded || !appReady) {
    return null
  }


  return <Navigation />;
};

export default function App() {
  return (
    <UserContextProvider>
      <ChatsContextProvider>
        <Root />
      </ChatsContextProvider>
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



// if (!fontsloaded || !appReady) {
//   const objectEntries = Object.entries(checking);
//   return (
//     <View>
//       <Text>Loading app</Text>
//       <Text>FONT READY: {fontsloaded ? "ready" : "not ready"}</Text>
//       <Text>appReady: {appReady ? "ready" : "not ready"}</Text>
//       {objectEntries.map(([key, value]) => {
//         return (
//           <Text style={{ fontFamily: LEXEND.Regular }} key={key}>
//             {key}: {String(value)}
//           </Text>
//         );
//       })}
//       <Text>ENV BASE_URL : {process.env.BASE_URL}</Text>
//       <Text>ENV FIREBASE_API_KEY : {process.env.FIREBASE_API_KEY}</Text>
//       <Text>
//         ENV FIREBASE_AUTH_DOMAIN : {process.env.FIREBASE_AUTH_DOMAIN}
//       </Text>
//       <Text>ENV FIREBASE_PROJECT_ID : {process.env.FIREBASE_PROJECT_ID}</Text>
//       <Text>
//         ENV FIREBASE_STORAGE_BUCKET : {process.env.FIREBASE_STORAGE_BUCKET}
//       </Text>
//       <Text>
//         ENV FIREBASE_MESSAGING_SENDER_ID :{" "}
//         {process.env.FIREBASE_MESSAGING_SENDER_ID}
//       </Text>
//       <Text>ENV FIREBASE_APP_ID : {process.env.FIREBASE_APP_ID}</Text>
//     </View>
//   );
// }