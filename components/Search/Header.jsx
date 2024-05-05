import { COLOR } from "COLOR";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
const Header = ({ updateFilter, name }) => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 12 }}
      >
        <Pressable onPress={() => nav.goBack()} style={styles.backContainer}>
          <Ionicons name="arrow-back" size={24} color={"white"} />
        </Pressable>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLOR.border} />
          <TextInput
            style={styles.searchInput}
            placeholder="cari tempat olahraga terbaikmu"
            value={name}
            onChangeText={updateFilter.bind(this, "name")}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.base900,
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  backContainer: {
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    columnGap: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: LEXEND.Regular,
  },
});
