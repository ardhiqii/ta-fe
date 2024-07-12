import Carousel from "@components/Carousel";
import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PickImage } from "util/pick-image";
import { Admin } from "util/admin/admin";
import { UserContext } from "store/user-contex";
import LoadingOverlay from "@components/LoadingOverlay";

const { width, height } = Dimensions.get("window");

const AlbumContent = ({
  idVenue,
  albumData = [],
  editMode = false,
  updateAlbumData,
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const data =
    albumData.length > 0
      ? albumData
      : [
          {
            url: "https://static.vecteezy.com/system/resources/previews/000/203/055/non_2x/isometric-soccer-stadium-vector.png",
          },
        ];

  const deleteImage = async (filename) => {
    setLoading(true);
    try {
      const resp = await Admin.SportVenue.deleteImageAlbumByVenueId(
        user.token,
        idVenue,
        filename
      );
      if (resp) {
        await updateAlbumData();
      }
    } catch (e) {
      console.log("error occured deleteImage", e);
    }
    setLoading(false);
  };

  const alertDeleteImage = (filename) => {
    Alert.alert("Confirmation", "Are you sure want to delete this image?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => deleteImage(filename),
      },
    ]);
  };

  const addImage = async () => {
    setLoading(true);
    const image = await PickImage.pick(false);
    if (!image) {
      setLoading(false);
      return;
    }
    const formData = await PickImage.imageToFormData(image);

    try {
      const resp = await Admin.SportVenue.addImageAlbumByVenueId(
        user.token,
        idVenue,
        formData
      );
      if (resp) {
        await updateAlbumData();
      }
    } catch (e) {
      console.log("error occured in addImage", e);
      Alert.alert("Failed to add image!", "Try with lower size image");
    }
    setLoading(false);
  };
  const renderItem = ({ item }) => {
    return (
      <>
        <Pressable style={styles.imageContainer}>
          <Image source={{ uri: item.url }} style={styles.image} />
          {editMode && (
            <View style={styles.buttonsContainer}>
              {albumData.length > 0 && (
                <Pressable
                  onPress={alertDeleteImage.bind(this, item.filename)}
                  style={styles.buttonContainer}
                >
                  <MaterialIcons name="delete" size={24} color={"white"} />
                </Pressable>
              )}
              <Pressable onPress={addImage} style={styles.buttonContainer}>
                <MaterialIcons name="image" size={24} color={"white"} />
              </Pressable>
            </View>
          )}
        </Pressable>
      </>
    );
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <Carousel renderItem={renderItem} data={data} />
    </>
  );
};

export default AlbumContent;

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",
  },
  imageContainer: {
    height: 216,
    width,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "relative",
  },
  buttonsContainer: {
    position: "absolute",
    zIndex: 4,
    right: 20,
    top: 10,
    flexDirection: "row",
    columnGap: 10,
  },
  buttonContainer: {
    backgroundColor: "#00000063",
    padding: 4,
    borderRadius: 4,
  },
});
