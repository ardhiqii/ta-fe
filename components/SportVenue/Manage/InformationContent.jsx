import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";

const InfoWithButton = ({ value, icon, button }) => {
  return (
    <View style={styles.layout}>
      <View
        style={[
          { flexDirection: "row", columnGap: 5 },
          button && { width: "70%" },
        ]}
      >
        <Ionicons name={icon} size={22} color={COLOR.base900} />
        <Text style={styles.text}>{value}</Text>
      </View>
      {button && (
        <Pressable style={styles.buttonContainer}>
          <Text
            style={{
              fontFamily: LEXEND.Regular,
              fontSize: 10,
              color: COLOR.base700,
            }}
          >
            {button}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const InformationContent = () => {
  const INFO_BUTTON = [
    {
      value: `Jl. Cisitu Lama Gg. 1 No.1, RT.006/RW.11, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40135`,
      button: "Open Map",
      icon: "location-outline",
    },
    {
      value: `+6988989989`,
      button: "Call",
      icon: "call-outline",
    },
    {
      value: `Lapang Badminton dengan 3 lapang yang  udah menggunakan karpet`,
      icon: "information-circle-outline",
    },
  ];
  return (
    <View style={styles.container}>
      {INFO_BUTTON.map((info, i) => (
        <InfoWithButton key={i} {...info} />
      ))}
      <Text style={[styles.text, styles.buttonRead]}>Read More</Text>
    </View>
  );
};

export default InformationContent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 12,
  },
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: COLOR.base700,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonRead: {
    textAlign: "center",
    fontFamily: LEXEND.SemiBold,
    color: COLOR.base900,
  },
});
