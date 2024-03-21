import Input from "@components/Input";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "@components/CustomModal";
import ModifyCategoryVenue from "./ModifyCategoryVenue";
const HeadContent = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Lapangan Futsal Merdeka</Text>
        <View style={{ flexDirection: "row" }}>
          <TagCategory category={"basket"} />
        </View>
      </View>
      <EditableHeadContent />
    </>
  );
};

export default HeadContent;

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    paddingHorizontal: 25,
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 20,
    color: COLOR.second900,
  },
});

const EditableHeadContent = () => {
  return (
    <View style={stylesEdit.container}>
      <View>
        <Input placeholder={"Your Name Venue"} />
      </View>
      <View style={stylesEdit.categoryContainer}>
        <View style={{ flexDirection: "row" }}>
          <TagCategory category={"basket"} />
        </View>
        <View>
          <Pressable>
            <Ionicons name="add-circle-outline" size={24} />
          </Pressable>
        </View>
      </View>
      <ModifyCategoryVenue/>
    </View>
  );
};

const stylesEdit = StyleSheet.create({
  container: { paddingHorizontal: 25, rowGap: 12 },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectContainer: {
    backgroundColor: "red",
    position: "absolute",
    width: "100%",
    top: 0,
  },
  outerModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: 300,
    borderRadius: 5,
  },
  
});
