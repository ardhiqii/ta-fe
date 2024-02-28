import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({ customStyle, customStyleText,configGradient, onPress, children }) => {
  if(configGradient){

    const colors = configGradient.colors ? configGradient.colors : [COLOR.base900, COLOR.base700]

    const start = configGradient.start ? configGradient.start : [0.4, 0]

    const end = configGradient.end ? configGradient.end : [0.9,0]
    return (
      <Pressable onPress={onPress}>
        <LinearGradient
          colors={colors}
          start={start}
          end={end}
          style={[styles.container, customStyle]}
        >
          <Text style={[styles.buttonText, customStyleText]}>{children}</Text>
        </LinearGradient>
      </Pressable>
    );
  }
  return (
    <Pressable onPress={onPress} style={[styles.container,customStyle]}>
      <Text style={[styles.buttonText,customStyleText]}>{children}</Text>
    </Pressable>
  );
  
};

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor:COLOR.base700
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontFamily: LEXEND.Bold,
  },
});

