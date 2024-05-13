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
  dataReserved
}) => {
  const selected = selectedTimes?.includes(value);
  const blacklisted = dataBlacklist?.includes(value);
  const reserved = dataReserved?.includes(value)

  const disabled = blacklisted || reserved
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
          {value}
        </Text>
      </Pressable>
      {disabled && <Text style={{textAlign:'center',fontFamily:LEXEND.Light,fontSize:11,color:COLOR.accent1}}>{reserved ? "Ordered" : "Closed"}</Text>}
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
