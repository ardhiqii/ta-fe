import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeableContent from "./SwipeableContent";



const GroupContentLayout = ({ title, children }) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.text, { color: COLOR.accent2 }]}>See All</Text>
      </View>
      <View style={styles.contentContainer}>
        {children}
      </View>
    </View>
  );
};

export default GroupContentLayout;

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:12,
  },
  text: {
    fontFamily: LEXEND.SemiBold,
    color: COLOR.second700,
  },
  contentContainer: {
  },
});
