import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { Location } from "util/location";

import { UserContext } from "store/user-contex";

const CustomTopNavigation = () => {
  const [address, setAddress] = useState("");
  const { updateCoordinate, user, getCurrentCoorUser } =
    useContext(UserContext);
  const nav = useNavigation();

  const getCurrentAddress = async () => {
    try {
      setAddress("Getting your address...");
      const coor = await getCurrentCoorUser();
      const address = await Location.getAddress(coor?.lat, coor?.lng);

      if (address !== "Failed to fetch address") {
        setAddress(address);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const initLocation = async () => {
      await getCurrentAddress();
    };
    initLocation();
  }, []);

  useEffect(() => {
    const updateAddress = async () => {
      setAddress("Getting your address...");
      const coor = user.coordinate;
      const address = await Location.getAddress(coor.lat, coor.lng);
      if (address !== "Failed to fetch address") {
        setAddress(address);
      }
    };

    updateAddress();
  }, [user.coordinate]);

  const navigateToSearch = () => {
    nav.navigate("Search");
  };
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        <Pressable onPress={navigateToSearch} style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLOR.border} />
          <Text style={styles.text}>Cari tempat olahraga terbaik untukmu</Text>
        </Pressable>
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
