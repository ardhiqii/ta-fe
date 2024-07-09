import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { Location } from "util/location";

import { UserContext } from "store/user-contex";
import { ChatsContext } from "store/chats-context";
import ProfileButton from "./ProfileButton";

const CustomTopNavigation = () => {
  const [address, setAddress] = useState("");
  const { updateCoordinate, user, getCurrentCoorUser } =
    useContext(UserContext);
  const { allUnreads } = useContext(ChatsContext);
  const nav = useNavigation();

  const isAdmin = user?.role === "admin";

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
  const navigateToChat = () => {
    nav.navigate("ChatNavigation", {
      screen: "ChatsScreen",
    });
  };

  const navigateToMenu = () => {
    nav.navigate("MenuProfile");
  };
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {!isAdmin && (
          <Pressable onPress={navigateToSearch} style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLOR.border} />
            <Text style={styles.text}>
              Cari tempat olahraga terbaik untukmu
            </Text>
          </Pressable>
        )}
        {isAdmin && <Text style={styles.header}>Your Sport Venue</Text>}
        <View style={[styles.menuContainer, isAdmin && { marginTop: 8 }]}>
          <Pressable onPress={navigateToChat}>
            {allUnreads > 0 && (
              <View style={styles.unread}>
                <Text
                  style={{
                    fontFamily: LEXEND.SemiBold,
                    fontSize: 11,
                    color: "white",
                  }}
                >
                  {allUnreads}
                </Text>
              </View>
            )}
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color={"white"}
            />
          </Pressable>
          <ProfileButton onPress={navigateToMenu} />
        </View>
      </View>
      {!isAdmin && (
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
      )}
    </View>
  );
};

export default CustomTopNavigation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.base900,
    paddingHorizontal: 25,
    paddingTop: 40,
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
    alignItems: "center",
  },
  locContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
    overflow: "hidden",
  },
  unread: {
    position: "absolute",
    top: -8,
    right: -5,
    zIndex: 99,
    backgroundColor: COLOR.accent2,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  header: {
    fontFamily: LEXEND.SemiBold,
    fontSize: 28,
    color: "white",
  },
});
