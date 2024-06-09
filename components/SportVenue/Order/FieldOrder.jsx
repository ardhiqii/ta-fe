import SwipeableContent from "@components/HomeContent/SwipeableContent";
import Input from "@components/Input";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const FieldOrder = ({
  id,
  number,
  updateFieldsData,
  match_type,
  howManyField,
  applyForAllFields,
  name,
  mergeSelected,
}) => {
  const isFriendly = match_type === "friendly";
  const isCompetitive = match_type === "competitive";

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: LEXEND.Regular }}>Field {number}</Text>
      <View style={{ rowGap: 14 }}>
        <View style={{ rowGap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              columnGap: 14,
              alignItems: "center",
            }}
          >
            <Text style={styles.subtext}>Name</Text>
            {howManyField > 1 && (
              <Pressable
                onPress={applyForAllFields.bind(this, id, "name")}
                style={styles.applyButton}
              >
                <Text style={[styles.subtext, { color: "white" }]}>
                  Apply for all
                </Text>
              </Pressable>
            )}
          </View>
          <Input
            onUpdateValue={updateFieldsData.bind(this, id, "name")}
            value={name}
          />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            rowGap: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              columnGap: 14,
              alignItems: "center",
            }}
          >
            <Text style={styles.subtext}>Match Type</Text>
            {howManyField > 1 && (
              <Pressable
                onPress={applyForAllFields.bind(this, id, "match_type")}
                style={styles.applyButton}
              >
                <Text style={[styles.subtext, { color: "white" }]}>
                  Apply for all
                </Text>
              </Pressable>
            )}
          </View>
          <View style={{ flexDirection: "row", columnGap: 12 }}>
            <Pressable
              style={[
                styles.matchButton,
                isFriendly && {
                  borderColor: COLOR.base900,
                  backgroundColor: COLOR.base900,
                },
              ]}
              onPress={updateFieldsData.bind(
                this,
                id,
                "match_type",
                "friendly"
              )}
            >
              <Text
                style={[
                  {
                    fontFamily: LEXEND.Light,
                    fontSize: 13,
                    color: COLOR.second300,
                  },
                  isFriendly && { color: "white" },
                ]}
              >
                Friendly
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.matchButton,
                isCompetitive && {
                  borderColor: COLOR.base900,
                  backgroundColor: COLOR.base900,
                },
              ]}
              onPress={updateFieldsData.bind(
                this,
                id,
                "match_type",
                "competitive"
              )}
            >
              <Text
                style={[
                  {
                    fontFamily: LEXEND.Light,
                    fontSize: 13,
                    color: COLOR.second300,
                  },
                  isCompetitive && { color: "white" },
                ]}
              >
                Competitive
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ rowGap: 8 }}>
          <Text style={styles.subtext}>Ordered Time</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <SwipeableContent
              customStyle={{ paddingHorizontal: 0 }}
              data={mergeSelected}
              renderItem={TimeDisplay}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FieldOrder;

const styles = StyleSheet.create({
  container: {
    rowGap: 1,
    backgroundColor: "#f3f3f356",
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  subtext: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
  },
  matchButton: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderColor: COLOR.second300,
  },

  applyButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: COLOR.accent2,
    paddingVertical: 4,
    paddingHorizontal: 8,
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

const customSort = (a, b) => {
  const startTimeA = a.split(" - ")[0];
  const startTimeB = b.split(" - ")[0];
  if (startTimeA < startTimeB) return -1;
  if (startTimeA > startTimeB) return 1;
  return 0;
};

const mergeTime = (times) => {
  let mergedSlots = [];
  let startTime = null;
  let endTime = null;
  for (let time of times) {
    const splitted = time.split(" - ");
    if (startTime === null) {
      startTime = splitted[0];
      endTime = splitted[1];
    } else if (endTime == splitted[0]) {
      endTime = splitted[1];
    } else {
      mergedSlots.push(`${startTime} - ${endTime}`);
      startTime = splitted[0];
      endTime = splitted[1];
    }
  }
  if (startTime !== null) {
    mergedSlots.push(`${startTime} - ${endTime}`);
  }

  return mergedSlots;
};

const convertedTime = (date) => {
  const fromDate = new Date(date);
  let formattedHour =
    fromDate.getHours() < 10
      ? `0${fromDate.getHours()}`
      : `${fromDate.getHours()}`;
  let formattedMinute =
    fromDate.getMinutes() < 10
      ? `0${fromDate.getMinutes()}`
      : `${fromDate.getMinutes()}`;
  const formatted = `${formattedHour}:${formattedMinute}`;
  return formatted;
};
