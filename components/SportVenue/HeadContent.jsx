import Input from "@components/Input";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Currency } from "util/currency";


const HeadContent = ({name,category,price_per_hour}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <TagCategory category={category} />
        </View>
        <View>
          <Text style={{fontFamily:LEXEND.SemiBold,fontSize:12,color:COLOR.second700}}>
            Rp.{Currency.format(price_per_hour)}/hour</Text>
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


