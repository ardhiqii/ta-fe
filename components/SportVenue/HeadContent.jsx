import Input from "@components/Input";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import EditHeadContent from "./EditMode/EditHeadContent";
const HeadContent = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Lapangan Futsal Merdeka</Text>
        <View style={{ flexDirection: "row" }}>
          <TagCategory category={"basket"} />
        </View>
      </View>
    </>
  );
};

export default HeadContent;

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    paddingHorizontal: 25,
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 20,
    color: COLOR.second900,
  },
});


