import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";

const TeamCard = ({ status, type }) => {
  const team = "team" + type;
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 5 }}
      >
        <Text style={styles.nameText} numberOfLines={2}>
          {status?.[team].name}
        </Text>
        {/* <Pressable>
          <MaterialIcons name="mode-edit" size={16} color={COLOR.accent2} />
        </Pressable> */}
      </View>
      {status?.[team].name !== "Team " + type && (
        <Text
          style={{ fontFamily: LEXEND.Light, color: "white", fontSize: 10 }}
        >
          Team {type}
        </Text>
      )}
    </View>
  );
};

export default TeamCard;

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
  },
  nameText: {
    fontFamily: LEXEND.SemiBold,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
