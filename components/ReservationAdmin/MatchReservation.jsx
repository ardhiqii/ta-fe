import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MatchReservation = ({hostName,mabarName,date,timeStart,timeEnd,idReservation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subText}>ID Reservation</Text>
        <Text style={styles.text}>{idReservation}</Text>
      </View>
      <View style={styles.layout}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subText}>Match Name</Text>
          <Text style={styles.text}>{mabarName}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.subText}>Host</Text>
          <Text style={styles.text}>{hostName}</Text>
        </View>
      </View>
      <View style={styles.layout}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subText}>Date</Text>
          <Text style={styles.text}>{date}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.subText}>Time</Text>
          <Text style={styles.text}>{timeStart.slice(0, -3)} - {timeEnd.slice(0, -3)}</Text>
        </View>
      </View>
    </View>
  );
};

export default MatchReservation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 8,
  },
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold, fontSize: 12 },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
  },
  layout: {
    flexDirection: "row",
  },
});
