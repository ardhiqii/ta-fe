import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "store/user-contex";
import { useNavigation } from "@react-navigation/native";

const ProfileButton = ({ style, sizeIcon = 24, onPress, imageSize }) => {
  const { user } = useContext(UserContext);
  const imageUri = user?.ava_url;
  const nav = useNavigation();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        imageSize && {
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize,
        },
        pressed && { opacity: 0.7, backgroundColor: "#7676764e" },
      ]}
    >
      {!imageUri && (
        <Ionicons name="person-sharp" size={sizeIcon} color={"white"} />
      )}
      {imageUri && (
        <View
          style={[
            styles.imageContainer,
            imageSize && { width: imageSize, height: imageSize },
          ]}
        >
          <Image src={imageUri} style={styles.image} />
        </View>
      )}
    </Pressable>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d3d3d3ff",
    width: 34,
    height: 34,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageContainer: {
    width: 34,
    height: 34,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
