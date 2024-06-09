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
import { useContext, useEffect, useState } from "react";
import { virtualId } from "util/virtual_id";
import { Token } from "util/token";
import { relogin } from "util/auth/auth";
import Navigation from "navigation/Navigation";
import { Role } from "util/role";

const Root = () => {
  let [fontsloaded] = useFonts({
    LexendDeca_300Light,
    LexendDeca_400Regular,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
    LexendDeca_900Black,
  });
  const [appReady, setAppReady] = useState(false);
  const { updateUser } = useContext(UserContext);

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
    console.log(id);
    console.log("============================");
    return id;
  };

  const checkingToken = async () => {
    console.log("============================");
    let token = await Token.getLocal();
    console.log("Checking Token is done");
    console.log(token);
    console.log("============================");
    return token;
  };

  const checkingRole = async () => {
    console.log("============================");
    let role = await Role.getLocal();
    console.log("Checking role is done");
    console.log(role);
    console.log("============================");
    return role;
  };

  const checkingUser = async (token, role) => {
    console.log("============================");
    try {
      const { data } = await relogin(token, role);
      if (data) {
        data["token"] = token;
        data["role"] = role
        updateUser(data);
      }
    } catch (e) {
      console.log("Failed relogin using token");
      Token.removeLocal();
      Role.removeLocal();
    }
    console.log("Checking user is done");
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

  if (!fontsloaded || !appReady) {
    return (
      <View>
        <Text>LOADING APP</Text>
      </View>
    );
  }

  return <Navigation />;
};

export default function App() {
  return (
    <UserContextProvider>
      <Root />
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
