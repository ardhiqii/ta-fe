import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import PlayerCard from "./PlayerCard";
const ScoreDisplay = ({status}) => {
  const configGradient = {
    colors: [COLOR.base700,COLOR.base900],
    start: [0.2, 0.1],
  };

  const scoreA = status?.playerA.score
  const scoreB = status?.playerB.score
  // const configGradient = {
  //   colors: ["#37474f", "#cfd8dc"],
  //   start: [0.4, 0.9],
  //   end: [0.1, -0.5],
  // };
  return (
    <View style={{ alignItems: "center" }}>
      <LinearGradient {...configGradient} style={styles.container}>
        {/* Title Header */}
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontFamily: LEXEND.SemiBold,
              color: "white",
              fontSize: 16,
            }}
          >
            Mabar Anak Kece HMIF
          </Text>
          <Text
            style={{
              fontFamily: LEXEND.Regular,
              color: COLOR.base500,
              fontSize: 14,
            }}
          >
            Friendly
          </Text>
        </View>
        {/* Main Content */}
        <View style={styles.scoreContainer}>
          <PlayerCard status={status} type={"A"} />
          <View>
            <Text style={styles.scoreText}>{scoreA} : {scoreB}</Text>
          </View>
          <PlayerCard status={status} type={"B"} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ fontFamily: LEXEND.Light, fontSize: 12, color: "white" }}
          >
            Field 1
          </Text>
          <Text
            style={{ fontFamily: LEXEND.Light, fontSize: 12, color: "white" }}
          >
            10:00 - 11:00
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default ScoreDisplay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 16,
    rowGap: 14,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },

  playerCard: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
  },
  nameText: {
    fontFamily: LEXEND.SemiBold,
    fontSize: 16,
    color: "white",
  },
  scoreText: {
    fontFamily: LEXEND.Bold,
    fontSize: 20,
    color: "white",
  },
});
