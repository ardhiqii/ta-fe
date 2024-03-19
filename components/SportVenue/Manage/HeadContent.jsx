import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HeadContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lapangan Futsal Merdeka</Text>
      <View style={{ flexDirection: "row" }}>
        <TagCategory category={"football"} />
      </View>
    </View>
  );
};

export default HeadContent;

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    paddingHorizontal:25,
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 20,
    color: COLOR.second900,
  },
});
