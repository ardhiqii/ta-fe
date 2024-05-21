import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Player } from "util/player/player";

const MatchInformation = ({
  isOpenMember,
  timeStart,
  timeEnd,
  date,
  roleReviewer,
  token,
  idReservation,
}) => {
  const isReviewerHost = roleReviewer === "host";
  const [openMember, setOpenMember] = useState(isOpenMember);

  const changeOpenMemberHandler = async () => {
    try {
      const { data } = await Player.Booking.changeStatusOpenMember(
        token,
        idReservation,
        !openMember
      );
      if (data.edit_status) {
        setOpenMember(!openMember);
      }
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <View>
          <Text style={styles.subText}>Match</Text>
          <Text style={styles.text}>
            This match is currently{" "}
            <Text style={{ fontFamily: LEXEND.Bold, fontSize: 12 }}>
              {openMember ? "open member" : "not open member"}
            </Text>
          </Text>
        </View>
        {isReviewerHost && (
          <Pressable
            onPress={changeOpenMemberHandler}
            style={{
              borderWidth: 2,
              borderRadius: 5,
              width: 80,
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
              borderColor: COLOR.base900,
            }}
          >
            <Text
              style={{
                fontFamily: LEXEND.Light,
                fontSize: 10,
                color: COLOR.base900,
              }}
            >
              Change
            </Text>
          </Pressable>
        )}
      </View>
      <View style={{ flexDirection: "row", columnGap: 20 }}>
        <View>
          <Text style={styles.subText}>Date</Text>
          <Text style={styles.text}>{date}</Text>
        </View>
        <View>
          <Text style={styles.subText}>Time</Text>
          <Text style={styles.text}>
            {timeStart.slice(0, -3)} - {timeEnd.slice(0, -3)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MatchInformation;

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
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold, fontSize: 12 },
  buttonRead: {
    textAlign: "center",
    fontFamily: LEXEND.SemiBold,
    color: COLOR.base900,
  },
});

const TimeDisplay = ({ item }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderColor: COLOR.base700,
      }}
    >
      <Text
        style={{
          fontFamily: LEXEND.Light,
          fontSize: 12,
          color: COLOR.second700,
        }}
      >
        {item}
      </Text>
    </View>
  );
};
