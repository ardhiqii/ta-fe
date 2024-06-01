import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Admin } from "util/admin/admin";
import { Player } from "util/player/player";
import { MaterialIcons } from "@expo/vector-icons";
const ImageVenue = ({ idVenue }) => {
  const [imageUri, setImageUri] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/203/055/non_2x/isometric-soccer-stadium-vector.png"
  );
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const isAdmin = user.role === "admin";

  const fetchAlbumData = async () => {
    setLoading(true);
    let resp = [];
    try {
      if (isAdmin) {
        const { data } = await Admin.SportVenue.getAlbumVenuById(
          user.token,
          idVenue
        );
        if (data) {
          resp = data;
        }
      } else {
        const { data } = await Player.SportVenue.getAlbumVenuById(
          user.token,
          idVenue
        );
        if (data) {
          resp = data;
        }
      }
      if (resp.length > 0) {
        setImageUri(resp[0].url);
      }
    } catch (e) {
      console.log("Error occured fetchAlbum SportVenueScreen", e);
      return null;
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlbumData();
  }, []);

  if (loading) {
    return (
      <View>
        <MaterialIcons name="image" size={60} color={"#dddddd"} />
      </View>
    );
  }
  return (
    <Image
      source={{
        uri: imageUri,
      }}
      style={styles.image}
    />
  );
};

export default ImageVenue;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
