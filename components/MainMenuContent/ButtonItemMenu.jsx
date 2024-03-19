import { LEXEND } from "@fonts/LEXEND";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
const ButtonItemMenu = ({children, customIcon, ioniconsName, customStyleContainer, onPress}) => {
  return (
    <Pressable style={[styles.container,customStyleContainer]} onPress={onPress}>
      {!customIcon && <Ionicons name={ioniconsName} color={COLOR.base800} size={24}/>}
      {customIcon}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default ButtonItemMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    columnGap:12,
  },
  text: {
    fontFamily: LEXEND.Regular,
  },
});
