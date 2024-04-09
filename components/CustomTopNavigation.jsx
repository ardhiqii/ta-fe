import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { Location } from "util/location";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";

const CustomTopNavigation = () => {
  const [address, setAddress] = useState("");
  const [locationPermissionInfomation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (locationPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInfomation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficinet Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };
  const getCurrentAddress = async () => {
    try {
      setAddress("Getting your address...");
      const hasPermission = await verifyPermissions();
      if (!hasPermission){
        setAddress("Permission Error!")
        return
      }

      const location = await getCurrentPositionAsync();
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      const address = await Location.getAddress(lat, lng);
      setAddress(address);

      // console.log(location);
      // console.log(address);
    } catch (e) {
      console.log(e);
    }
  };
  
  const nav = useNavigation();
  useEffect(() => {
    locationPermissionInfomation;
    const initLocation = async () => {
      await getCurrentAddress();
    };
    initLocation();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLOR.border} />
          <Text style={styles.text}>Cari tempat olahraga terbaik untukmu</Text>
        </View>
        <View style={styles.menuContainer}>
          <Ionicons name="notifications-outline" size={24} color={"white"} />
          <Pressable onPress={() => nav.navigate("MainMenu")}>
            <Ionicons name="menu-sharp" size={24} color={"white"} />
          </Pressable>
        </View>
      </View>
      <Pressable onPress={getCurrentAddress} style={styles.locContainer}>
        <Ionicons name="location-outline" size={18} color={"white"} />

        <Text
          style={[styles.text, { color: "white", fontFamily: LEXEND.Bold }]}
        >
          Your Location:{" "}
        </Text>
        <Text
          style={[styles.text, { color: "white" }]}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {address}
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomTopNavigation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.base900,
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 10,
    rowGap: 15,
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    columnGap: 4,
    flex: 1,
  },
  text: {
    color: COLOR.border,
    fontFamily: LEXEND.Regular,
    fontSize: 12,
  },
  menuContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  locContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
    overflow: "hidden",
  },
});
