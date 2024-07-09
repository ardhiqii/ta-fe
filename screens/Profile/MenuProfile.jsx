import EditImageProfile from "@components/MenuProfile/EditImageProfile";
import EditInfoProfile from "@components/MenuProfile/EditInfoProfile";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useContext } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";

const MenuProfile = () => {
  const { user, logoutUser } = useContext(UserContext);

  const alertLogout = () => {
    Alert.alert("Confirmation", "Are you sure want to logout?", [
      {
        text: "Yes",
        onPress: logoutUser,
      },
      {
        text: "No",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <EditImageProfile />
      <EditInfoProfile />
      <Pressable
        onPress={alertLogout}
        style={({ pressed }) => [styles.logout, pressed && { opacity: 0.7 }]}
      >
        <Text style={{ fontFamily: LEXEND.SemiBold, color: COLOR.accent1 }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default MenuProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 20,
    paddingHorizontal: 25,
  },
  logout: {
    borderWidth: 1,
    width: 80,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: COLOR.accent1,
    justifyContent: "center",
    alignItems: "center",
  },
});
