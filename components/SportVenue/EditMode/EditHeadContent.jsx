import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModifyCategoryVenue from "../ModifyCategoryVenue";
import Input from "@components/Input";
import TagCategory from "@components/TagCategory";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { CATEGORY_ID } from "constant/CATEGORY_ID";

const EditHeadContent = ({ name, setNewData, oldData }) => {
  const [showModal, setShowModal] = useState(false);
  const [currCategory, setCurrentCategory] = useState(oldData?.category);

  // useEffect(() => {
  //   console.log(currCategory);
  //   console.log(CATEGORY_ID[currCategory]);
  // }, [currCategory]);
  const updateInputHandler = (inputIdentifier, value) => {
    setNewData((prev) => {
      return { ...prev, [inputIdentifier]: value };
    });
  };
  const updateCategory = (value) => {
    updateInputHandler("category", value);
    updateInputHandler("Sport_Kind_id", CATEGORY_ID[value]);
    setCurrentCategory(value);
  };
  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder={oldData.name ? oldData.name : "Your Name Venue"}
          value={name}
          onUpdateValue={updateInputHandler.bind(this, "name")}
        />
      </View>
      <View style={styles.categoryContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {!!!currCategory && (
            <View>
              <Text
                style={{
                  fontFamily: LEXEND.Regular,
                  fontSize: 12,
                  color: COLOR.second300,
                }}
              >
                Choose your category
              </Text>
            </View>
          )}

          {!!currCategory && <TagCategory category={currCategory} />}
        </View>
        <View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.7, backgroundColor: "#7676762e" },
            ]}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                fontFamily: LEXEND.Light,
                fontSize: 12,
                color: COLOR.base900,
              }}
            >
              {!!currCategory ? "Change" : "Choose"}
            </Text>
          </Pressable>
        </View>
      </View>
      <ModifyCategoryVenue
        category={currCategory}
        setCategory={updateCategory}
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
  button: {
    borderWidth: 2,
    borderRadius: 5,
    width: 70,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.base900,
  },
});
