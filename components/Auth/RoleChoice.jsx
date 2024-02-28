import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const RoleChoice = ({ choice, setChoice,children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
      <View style={styles.buttonsContainer}>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setChoice("player")}
            customStyle={
              choice !== "player" ? styles.unSelected : styles.selected
            }
            customStyleText={choice !== "player" ? styles.unSelectedText : {}}
          >
            Player
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => setChoice("admin")}
            customStyle={
              choice !== "admin" ? styles.unSelected : styles.selected
            }
            customStyleText={choice !== "admin" ? styles.unSelectedText : {}}
          >
            Admin
          </Button>
        </View>
      </View>
    </View>
  );
};

export default RoleChoice;

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 20,
  },
  text: {
    fontFamily: LEXEND.Regular,
    color: COLOR.border,
  },
  selected: {
    borderWidth: 1,
    borderColor: COLOR.base700,
  },
  unSelected: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLOR.base700,
  },
  unSelectedText: {
    color: COLOR.base700,
  },
});
