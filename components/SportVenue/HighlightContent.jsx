import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
const Box = ({ value, icon, title, id }) => {
  return (
    <View style={[boxStyles.container, id === 1 && boxStyles.border]}>
      <View style={boxStyles.iconContainer}>
        {icon}
        <Text
          style={[boxStyles.text, { fontFamily: LEXEND.Regular, fontSize: 14 }]}
        >
          {value}
        </Text>
      </View>
      <Text
        style={[boxStyles.text, { fontFamily: LEXEND.Light, fontSize: 12 }]}
      >
        {title}
      </Text>
      <Text
        style={[
          { fontFamily: LEXEND.SemiBold, fontSize: 10, color: COLOR.base700 },
        ]}
      >
        Show More
      </Text>
    </View>
  );
};

const boxStyles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 3,
    alignItems: "center",
  },
  border: {
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#90a4ae",
    borderStyle: "dashed",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 3,
  },
  text: {
    color: COLOR.second700,
  },
});

const HighlightContent = () => {
  const BOX_DATA = [
    {
      title: "Rating (20)",
      value: "4.5",
      icon: <Ionicons name="star" size={20} color={COLOR.gold} />,
    },
    {
      title: "Price",
      value: "~Rp135k",
      icon: <FontAwesome5 name="dollar-sign" size={20} color={COLOR.gold} />,
    },
    {
      title: "Location",
      value: "1.7 km",
      icon: <Ionicons name="location-outline" size={20} color={COLOR.gold} />,
    },
  ];
  return (
    <View style={styles.container}>
      {BOX_DATA.map((item, i) => (
        <Box key={i} {...item} id={i} />
      ))}
    </View>
  );
};

export default HighlightContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent:'space-between'
  },
});
