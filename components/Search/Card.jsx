import Category from "@components/HomeContent/Category";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Currency } from "util/currency";

const Card = ({
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
    <Pressable onPress={NavigateToVenue} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://www.datra.id/uploads/project/50/gor-citra-bandung-c915x455px.png",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>{name}</Text>
        <Text
          style={{
            fontFamily: LEXEND.SemiBold,
            color: COLOR.base900,
            fontSize: 12,
          }}
        >
          Rp.{Currency.format(price)}
        </Text>
        <BorderHorizontal />
        <View
          style={{ flexDirection: "row", alignItems: "center", columnGap: 4 }}
        >
          <Text
            style={{
              fontFamily: LEXEND.Light,
              fontSize: 10,
              color: COLOR.border,
              marginTop: -3,
            }}
          >
            {convertDistance(distance)}
          </Text>
          <BorderVertical />
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            {!!is_car_parking && (
              <Ionicons name="car-outline" size={22} color={COLOR.base900} />
            )}

            {!!is_bike_parking && (
              <Ionicons name="bicycle" size={22} color={COLOR.base900} />
            )}
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TagCategory category={category.toLowerCase()} />
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 8,
  },
  imageContainer: {
    borderWidth: 1,
    color: COLOR.second300,
    width: 112,
    height: 107,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  infoContainer: {
    paddingHorizontal: 8,
    flex: 1,
    rowGap: 4,
  },
});

const BorderVertical = () => {
  return (
    <View style={{ width: 2.5, backgroundColor: COLOR.border, height: 15 }} />
  );
};

const BorderHorizontal = () => {
  return (
    <View
      style={{
        height: 1,
        borderBottomWidth: 1,
        borderColor: "#B0BEC5",
        borderStyle: "dashed",
      }}
    />
  );
};
