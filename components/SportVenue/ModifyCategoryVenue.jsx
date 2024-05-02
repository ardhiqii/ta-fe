import CustomModal from "@components/CustomModal";
import TagCategory from "@components/TagCategory";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";

const ALL_CATEGORY = [
  "futsal",
  "basket",
  "badminton",
  "volley",
  "swimming",
  "bowling",
  "tennis",
];

const ModifyCategoryVenue = ({visible, closeModal,setCategory,category}) => {
  const [cat, setCat] = useState(category);

  const doneHandler = ()=>{
    setCategory(cat);
    closeModal();
  }
  return (
    <CustomModal style={styles.outerModal} visible={visible} closeModal={closeModal} >
      <View style={styles.modalContainer}>
        <View style={styles.navContainer}>
          <Text style={{ fontFamily: LEXEND.SemiBold, fontSize: 18 }}>
            Category Venue
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 25,
              gap: 8,
              paddingBottom: 8,
              flexWrap: "wrap",
            }}
          >

            { !!category &&<TagCategory
                category={cat}
                customText={{ fontSize: 14, fontFamily: LEXEND.Regular }}
              />}
          </View>
          <BorderLine />
          <View style={{ rowGap: 12, paddingVertical: 10 }}>
            {ALL_CATEGORY.map((item, i) => {
              const selected = cat === item;
              return (
                <SelectLabel
                  key={i}
                  value={item}
                  selected={selected}
                  onChange={setCat}
                  cat={cat}
                />
              );
            })}
          </View>
        </View>
        <BorderLine />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 12,
            columnGap: 10,
          }}
        >
          <Pressable onPress={doneHandler} style={[styles.button, { backgroundColor: COLOR.base700 }]}>
            <Text style={styles.buttonText}>DONE</Text>
          </Pressable>
          <Pressable onPress={closeModal} style={[styles.button, { backgroundColor: "#f98b8b" }]}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </CustomModal>
  );
};

export default ModifyCategoryVenue;

const styles = StyleSheet.create({
  outerModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    width: 300,
    borderRadius: 5,
  },
  navContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 15,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 70,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  buttonText: {
    fontFamily: LEXEND.SemiBold,
  },
});

const SelectLabel = ({ value, selected, onChange, cat }) => {
  const changeHandler = () => {
    onChange(value)
  };

  const name = value.charAt(0).toUpperCase() + value.slice(1);
  return (
    <Pressable style={stylesLabel.container} onPress={changeHandler}>
      <Text style={{ fontFamily: LEXEND.Regular }}>{name}</Text>
      <View style={stylesLabel.circleContainer}>
        <View
          style={[stylesLabel.circle, selected && stylesLabel.selectedCircle]}
        />
      </View>
    </Pressable>
  );
};

const stylesLabel = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  circleContainer: {
    borderRadius: 100,
    backgroundColor: "#efefefaa",
    width: 20,
    height: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#d8d8d8",
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  selectedCircle: {
    backgroundColor: "#8bf98e",
  },
});

const BorderLine = () => {
  return (
    <View
      style={[
        {
          borderBottomWidth: 4,
          borderColor: "#eceff1",
        },
      ]}
    />
  );
};
