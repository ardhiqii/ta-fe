import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { Currency } from "util/currency";
import { UserContext } from "store/user-contex";

const Card = ({ id, name, price_per_hour, Sport_Kind_Name, is_public }) => {
  const [imageUri, setImageUri] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/203/055/non_2x/isometric-soccer-stadium-vector.png"
  );
  const nav = useNavigation();
  const { user } = useContext(UserContext);

  const fetchAlbumData = async () => {
    try {
      const { data } = await Admin.SportVenue.getAlbumVenuById(user.token, id);
      if (data.length > 0) {
        setImageUri(data[0].url);
      }
    } catch (e) {
      console.log("Error occured fetchAlbum SportVenueScreen", e);
      return null;
    }
  };

  useEffect(() => {
    fetchAlbumData();
  }, []);

  const navigateHandler = async () => {
    nav.navigate("SportVenueNavigation", {
      screen: "ManageSportVenueAdmin",
      params: {
        idVenue: id,
        editMode: true,
      },
    });
  };
  return (
    <Pressable onPress={navigateHandler}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={[styles.text]}>{name}</Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: LEXEND.SemiBold, color: COLOR.base900 },
                ]}
              >
                Rp.{Currency.format(price_per_hour)}
              </Text>
            </View>
            <View></View>
            <View style={{ flexDirection: "row" }}>
              <TagCategory category={Sport_Kind_Name.toLowerCase()} />
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
    paddingHorizontal: 25,
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
    height: 100,
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
