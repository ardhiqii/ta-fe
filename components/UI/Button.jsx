import { LEXEND } from "@fonts/LEXEND";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({customStyle,customStyleText,onPress,children}) => {
  return (
    <Pressable style={[styles.container,customStyle]} onPress={onPress}>
      <Text style={[styles.buttonText,customStyleText]}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: "#2f505c",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontFamily: LEXEND.Bold,
  },
});
