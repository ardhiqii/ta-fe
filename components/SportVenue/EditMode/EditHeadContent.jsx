import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModifyCategoryVenue from "../ModifyCategoryVenue";
import Input from "@components/Input";
import TagCategory from "@components/TagCategory";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";

const EditHeadContent = ({ name, category = [], setNewData }) => {
  const [showModal, setShowModal] = useState(false);
  const updateInputHandler = (inputIdentifier, value) => {
    setNewData((prev) => {
      return { ...prev, [inputIdentifier]: value };
    });
  };
  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder={"Your Name Venue"}
          value={name}
          onUpdateValue={updateInputHandler.bind(this, "name")}
        />
      </View>
      <View style={styles.categoryContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {category.length ===0 && <View>
            <Text style={{fontFamily:LEXEND.Regular,fontSize:12,color:COLOR.second300}}>Add your category</Text>
            </View>}
          {category?.map((cat, i) => (
            <View key={i}>
              <TagCategory category={cat} />
            </View>
          ))}
        </View>
        <View>
          <Pressable onPress={() => setShowModal(true)}>
            <Ionicons name="add-circle-outline" size={24} />
          </Pressable>
        </View>
      </View>
      <ModifyCategoryVenue
        category={category}
        setCategory={updateInputHandler.bind(this, "category")}
        visible={showModal}
        closeModal={() => setShowModal(false)}
      />
    </View>
  );
};

export default EditHeadContent;

const styles = StyleSheet.create({
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
