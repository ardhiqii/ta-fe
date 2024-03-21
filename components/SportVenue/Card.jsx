import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
        <View style={{flexDirection:'row', columnGap:8}}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://www.datra.id/uploads/project/50/gor-citra-bandung-c915x455px.png",
              }}
              style={styles.image}
            />
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
              <TagCategory category={"basket"} />
            </View>
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
    paddingHorizontal:25,
    flexDirection: "row",
    columnGap: 10,
    justifyContent:'space-between'
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
    justifyContent: "center",
    rowGap: 6,
  },
  text: {
    fontFamily: LEXEND.Light,
    color: COLOR.second900,
    fontSize: 12,
  },
});
