import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import TeamCard from "./TeamCard";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";
import { useRoute } from "@react-navigation/native";
const ScoreDisplay = ({ status }) => {
  const [reservationData, setReservationData] = useState();
  const { user } = useContext(UserContext);
  const route = useRoute();
  const idReservation = route?.params?.idReservation;
  const fetchReservationData = async () => {
    if (idReservation) {
      try {
        const { data } = await Player.Booking.getOrderById(
          user.token,
          idReservation
        );
        setReservationData(data);
      } catch (e) {
        return null;
      }
    }
  };

  useEffect(() => {
    fetchReservationData();
  }, []);

  const timeStart = reservationData?.info?.time_start;
  const timeEnd = reservationData?.info?.time_end;
  const mabarName = reservationData?.info?.mabar_name;
  const configGradient = {
    colors: [COLOR.base700, COLOR.base900],
    start: [0.2, 0.1],
  };

  const scoreA = status?.teamA.score;
  const scoreB = status?.teamB.score;
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
            numberOfLines={1}
          >
            {mabarName}
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
          <TeamCard status={status} type={"A"} />
          <View>
            <Text style={styles.scoreText}>
              {scoreA} : {scoreB}
            </Text>
          </View>
          <TeamCard status={status} type={"B"} />
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
            {timeStart?.slice(0, -3)} : {timeEnd?.slice(0, -3)}
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
