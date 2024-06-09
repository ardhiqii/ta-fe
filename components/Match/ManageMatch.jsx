import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ManagePlayer } from "./ManagePlayer";
import Input from "@components/Input";
import { LEXEND } from "@fonts/LEXEND";

const ManageMatch = ({ status, setStatus }) => {
  const configGradient = {
    colors: ["#3e82f5", "#bcdcfc"],
    start: [0.3, 0],
    end: [0.8, 0],
  };

  const changeScoreValueHandler = (value) => {
    if (value < 1) {
      return;
    }
    setStatus((prev) => {
      return { ...prev, changeScoreValue: value };
    });
  };
  return (
    <View style={styles.container}>
      <ManagePlayer type={"A"} setStatus={setStatus} status={status} />
      <ManagePlayer type={"B"} setStatus={setStatus} status={status} />
      <View style={{ flexDirection: "row", columnGap: 4 }}>
        <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>
          Change Score Value:{" "}
        </Text>
        <Input
          value={status?.changeScoreValue.toString()}
          inputContainerStyle={styles.inputContainer}
          onUpdateValue={changeScoreValueHandler}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};

export default ManageMatch;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 8,
  },
  inputContainer: {
    fontSize: 8,
    height: 20,
    width: 40,
    paddingVertical: 0,
    paddingHorizontal: 4,
  },
});
