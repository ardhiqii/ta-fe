import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import TagCategory from "./TagCategory";
import { useNavigation } from "@react-navigation/native";
import { Currency } from "util/currency";
import { Player } from "util/player/player";
import { UserContext } from "store/user-contex";
import ImageVenue from "./SportVenue/ImageVenue";

const CardVeneu = ({
  id: idVenue,
  name,
  geo_coordinate,
  distance,
  Sport_Kind_Name: category,
  is_bike_parking,
  is_car_parking,
  is_public,
  price_per_hour: price,
}) => {
  const { user } = useContext(UserContext);
  const nav = useNavigation();

  const NavigateToVenue = () => {
    nav.navigate("SportVenueNavigation", {
      screen: "SportVenueScreen",
      params: {
        idVenue: idVenue,
      },
    });
  };
  if (!is_public) {
    return;
  }
  const convertDistance = (distance) => {
    const number = distance.toFixed(1);
    return number + " km";
  };
  return (
    <Pressable style={styles.container} onPress={NavigateToVenue}>
      <View style={styles.imageContainer}>
        <ImageVenue idVenue={idVenue} />
      </View>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.text} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.text, { color: COLOR.border }]}>
            {convertDistance(distance)}
          </Text>
        </View>
        <Text
          style={[
            styles.text,
            { color: COLOR.base900, fontFamily: LEXEND.SemiBold },
          ]}
        >
          Rp.{Currency.format(price)}
        </Text>
        {/* <View
          style={{ alignItems: "center", flexDirection: "row", columnGap: 4 }}
        >
          <Ionicons name="star" size={14} color={COLOR.gold} />
          <Text style={[styles.text, { color: COLOR.border }]}>4.8</Text>
          <Text style={[styles.text, { color: COLOR.border }]}>|</Text>
          <Text style={[styles.text, { color: COLOR.border }]}>
            Dipesan 26x
          </Text>
        </View> */}
        <View style={styles.tagsContainer}>
          <TagCategory category={category.toLowerCase()} />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <View style={{ flexDirection: "row", columnGap: 4 }}>
            {!!is_car_parking && (
              <Ionicons name="car-outline" size={22} color={COLOR.base900} />
            )}

            {!!is_bike_parking && (
              <Ionicons name="bicycle" size={22} color={COLOR.base900} />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardVeneu;

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 230,
    borderRadius: 10,
    // backgroundColor: "#e9e9e9",
    borderWidth: 1,
  },
  imageContainer: {
    height: 120,
    borderBottomWidth: 1,
    color: COLOR.base800,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  infoContainer: {
    padding: 8,
    rowGap: 4,
  },
  text: {
    fontFamily: LEXEND.Light,
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 3,
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
