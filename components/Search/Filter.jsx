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

const Filter = ({ items, label, onUpdate, value }) => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(label);

  useEffect(() => {
    if (value !== undefined) {
      selectHandler(value);
    }
  }, []);
  const toggleDropdown = (value) => {
    setOpen(value);
  };

  const selectHandler = (value) => {
    if (select === value) {
      onUpdate(null);
      setSelect(label);
    } else {
      if (value) {
        onUpdate(value.toLowerCase());
        setSelect(value);
      }
    }
    toggleDropdown(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={toggleDropdown.bind(this, !open)}
        style={[
          styles.buttonContainer,
          open && { borderBottomEndRadius: 0, borderBottomStartRadius: 0 },
        ]}
      >
        <Text numberOfLines={1} style={{ fontFamily: LEXEND.Regular, width:'80%' }}>{allCapital(select)}</Text>
        <Ionicons name={open ? "arrow-up" : "arrow-down"} />
      </Pressable>
      {open && (
        <View style={styles.listContainer}>
          {items.map((d, i) => {
            const name = allCapital(d);

            return (
              <Pressable
                key={i + 1}
                onPress={selectHandler.bind(this, d)}
                style={[
                  styles.itemContainer,
                  select === d && { backgroundColor: "#ccd7d1" },
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

const allCapital = (status) => {
  let displayStatus = status.toLowerCase().split("_");
  for (let [i, s] of displayStatus.entries()) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    displayStatus[i] = s;
  }
  displayStatus = displayStatus.join(" ");
  return displayStatus;
};
