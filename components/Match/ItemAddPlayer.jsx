import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ItemAddPlayer = ({ selected = [], username, setSelected }) => {
  const isSelected = selected.includes(username);
  const addHandler = () => {
    if (!isSelected) {
      setSelected((prev) => [...prev, username]);
    } else {
      const filtered = selected.filter((s) => s !== username);
      setSelected(filtered);
    }
  };
  return (
    <Pressable
      onPress={addHandler}
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={{ fontFamily: LEXEND.Regular, fontSize: 14 }}>
        {username}
      </Text>
    </Pressable>
  );
};

export default ItemAddPlayer;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: "#d7d7d7",
  },
  selected: {
    borderColor: COLOR.base600,
    backgroundColor:COLOR.base600
  },
});
