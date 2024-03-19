import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Admin } from "util/admin/admin";

const Card = () => {
  const nav = useNavigation();
  const navigateHandler = async () => {
    
    nav.navigate("SportVenueNavigation", {
      screen: "ManageSportVenueAdmin",
      params: {
        idVenue: "2454c84f-51a1-437a-a396-018f0bd5c3e3",
      },
    });
  };
  return (
    <Pressable onPress={navigateHandler}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Entypo name="cross" size={48} color={COLOR.second800} />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={[styles.text]}>GOR Bulutangkis Merdeka</Text>
            <Text
              style={[
                styles.text,
                { fontFamily: LEXEND.SemiBold, color: COLOR.base900 },
              ]}
            >
              Rp 50.000 - 65.000
            </Text>
          </View>
          <View>
            <Text style={[styles.text, { color: COLOR.border }]}>1.7 km</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TagCategory category={"badminton"} />
          </View>
        </View>
        <View style={{ justifyContent: "center" }}>
          <MaterialCommunityIcons
            name={"pencil"}
            size={24}
            color={COLOR.base900}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 10,
  },
  imageContainer: {
    borderWidth: 1,
    color: COLOR.second800,
    width: 112,
    height: 107,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  infoContainer: {
    justifyContent: "center",
    rowGap: 6,
  },
  text: {
    fontFamily: LEXEND.Light,
    color: COLOR.second900,
    fontSize: 12,
  },
});
