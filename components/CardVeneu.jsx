import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import TagCategory from "./TagCategory";

const CardVeneu = ({ idVenue, name, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Entypo name="cross" size={60} color={COLOR.second800} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.text, { color: COLOR.border }]}>1.7 km</Text>
        <Text style={styles.text}>{name}</Text>
        <Text
          style={[
            styles.text,
            { color: COLOR.base900, fontFamily: LEXEND.SemiBold },
          ]}
        >
          Rp 200.000 - 150.000
        </Text>
        <View
          style={{ alignItems: "center", flexDirection: "row", columnGap: 4 }}
        >
          <Ionicons name="star" size={14} color={COLOR.gold} />
          <Text style={[styles.text, { color: COLOR.border }]}>4.8</Text>
          <Text style={[styles.text, { color: COLOR.border }]}>|</Text>
          <Text style={[styles.text, { color: COLOR.border }]}>
            Dipesan 26x
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          <TagCategory category={"football"}/>
          <TagCategory category={"volley"}/>
          <TagCategory category={"badminton"}/>
        </View>
      </View>
    </View>
  );
};

export default CardVeneu;

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 288,
    borderRadius: 10,
    // backgroundColor: "#e9e9e9",
    borderWidth: 1,
  },
  imageContainer: {
    height: 140,
    borderBottomWidth: 1,
    color: COLOR.base800,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 8,
    rowGap: 2,
  },
  text: {
    fontFamily: LEXEND.Light,
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 3,
    flexWrap:"wrap",
  },
});
