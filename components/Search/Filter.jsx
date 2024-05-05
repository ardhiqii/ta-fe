import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";

const Filter = ({ items, label, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(label);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const selectHandler = (value) => {
    if (select === value) {
      onUpdate(null);
      setSelect(label);
    } else {
      onUpdate(value.toLowerCase());
      setSelect(value);
    }
    toggleDropdown()
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggleDropdown}
        style={[
          styles.buttonContainer,
          open && { borderBottomEndRadius: 0, borderBottomStartRadius: 0 },
        ]}
      >
        <Text style={{ fontFamily: LEXEND.Regular }}>{select}</Text>
        <Ionicons name={open ? "arrow-up" : "arrow-down"} />
      </Pressable>
      {open && (
        <View style={styles.listContainer}>
          {items.map((d, i) => {
            let name = d.toLowerCase();
            name = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <Pressable
                key={i + 1}
                onPress={selectHandler.bind(this, name)}
                style={[
                  styles.itemContainer,
                  select === name && { backgroundColor: "#ccd7d1" },
                ]}
              >
                <Text style={{ fontFamily: LEXEND.Regular }}>{name}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  buttonContainer: {
    backgroundColor: COLOR.base600,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    width: 100,
    height: 28,
    justifyContent: "space-between",
  },
  listContainer: {
    position: "absolute",
    top: "100%",
    zIndex: 9999,
    width: "100%",
    backgroundColor: COLOR.base500,
    rowGap: 12,
    paddingVertical: 8,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  itemContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
