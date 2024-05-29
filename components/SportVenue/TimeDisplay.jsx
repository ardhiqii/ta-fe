import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

const TimeDisplay = ({
  id,
  value,
  selectedTimes,
  onChangeSelected,
  dataBlacklist,
  blacklisted,
  isReserved,
  dataReserved,
}) => {
  // if (dataBlacklist.length !== 0) {
  //   console.log(dataBlacklist);
  // }
  const from = value.split("UNTIL")[0];
  const to = value.split("UNTIL")[1];
  const startFormatted = convertedTime(from);
  const endFormatted = convertedTime(to);

  const selected = selectedTimes?.includes(value);
  const disabled = blacklisted || isReserved;
  const handleSelected = () => {
    let updateSelected = selectedTimes;
    if (selected) {
      updateSelected = updateSelected.filter((t) => t != value);
    } else {
      updateSelected.push(value);
    }
    onChangeSelected(id, updateSelected);
  };
  return (
    <View>
      <Pressable
        disabled={disabled}
        onPress={handleSelected}
        style={[
          timeStyles.container,
          selected && timeStyles.selectedContainer,
          disabled && { backgroundColor: "#e5e3e3" },
        ]}
      >
        <Text style={[timeStyles.text, selected && { color: COLOR.base500 }]}>
          {startFormatted} - {endFormatted}
        </Text>
      </Pressable>
      {disabled && (
        <Text
          style={{
            textAlign: "center",
            fontFamily: LEXEND.Light,
            fontSize: 11,
            color: COLOR.accent1,
          }}
        >
          {isReserved ? "Ordered" : "Closed"}
        </Text>
      )}
    </View>
  );
};

const timeStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.second300,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 3,
  },
  text: {
    color: COLOR.second300,
    fontFamily: LEXEND.Light,
    fontSize: 12,
  },
  selectedContainer: {
    borderColor: COLOR.base900,
    backgroundColor: COLOR.base900,
  },
});

export default TimeDisplay;

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
