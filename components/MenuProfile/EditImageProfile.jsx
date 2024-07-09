import ProfileButton from "@components/ProfileButton";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EditImageProfile = () => {
  return (
    <View style={styles.container}>
      <ProfileButton onPress={() => {}} imageSize={70} />
      <Text style={styles.text}>Change profile picture</Text>
    </View>
  );
};

export default EditImageProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    rowGap:8
  },
  text: {
    fontFamily: LEXEND.SemiBold,
    color: COLOR.base900,
  },
});
