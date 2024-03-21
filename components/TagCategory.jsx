import { LEXEND } from "@fonts/LEXEND";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const colors = {
  football: {
    primary800: "#37474f",
    primary100: "#cfd8dc",
  },
  basket: {
    primary800: "#dd464f",
    primary100: "#ffc7ba",
  },
  badminton: {
    primary800: "#f9008e",
    primary100: "#fdacce",
  },
  volley: {
    primary800: "#009da9",
    primary100: "#85f4de",
  },
  swimming: {
    primary800: "#3e82f5",
    primary100: "#bcdcfc",
  },
  bowling: {
    primary800: "#7700b7",
    primary100: "#d6b9e9",
  },
  tennis: {
    primary800: "#ceb600",
    primary100: "#fcf3b2",
  },
};

const TagCategory = ({ category,customText }) => {
  const name = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors[category].primary100 },
      ]}
    >
      <Text style={[styles.text, { color: colors[category].primary800 },customText]}>
        {name}
      </Text>
    </View>
  );
};

export default TagCategory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 10,
  },
});
