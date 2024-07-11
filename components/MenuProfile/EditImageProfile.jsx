import LoadingOverlay from "@components/LoadingOverlay";
import ProfileButton from "@components/ProfileButton";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { PickImage } from "util/pick-image";
import { Player } from "util/player/player";

const EditImageProfile = () => {
  const { user, updateWithCertainType } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const changeImage = async () => {
    setLoading(true);
    const image = await PickImage.pick();
    if (!image) {
      setLoading(false);
      return;
    }
    const formData = await PickImage.imageToFormData(image);
    try {
      const { data } = await Player.Profile.updatePhotoProfile(
        user.token,
        formData
      );
      if (data) {
        updateWithCertainType("ava_url", data.ava_url);
      }
    } catch (error) {
      console.log("ERROR changeImage", error);
      Alert.alert("Failed Change Profile", "Probably file too large", [
        {
          text: "ok",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <View style={styles.container}>
        <ProfileButton onPress={changeImage} imageSize={70} />
        <Text onPress={changeImage} style={styles.text}>
          Change profile picture
        </Text>
      </View>
      {loading && <LoadingOverlay />}
    </>
  );
};

export default EditImageProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    rowGap: 8,
  },
  text: {
    fontFamily: LEXEND.SemiBold,
    color: COLOR.base900,
  },
});
