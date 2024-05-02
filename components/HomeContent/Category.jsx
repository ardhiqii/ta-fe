import React from "react";
import GroupContentLayout from "./GroupContentLayout";
import SwipeableContent from "./SwipeableContent";
import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { CategoryIcons } from "assets/category/CATEGORY_ICON";

const CATEGORY_DATA = [
  {
    id: "1",
    name: "Futsal",
    icon: <CategoryIcons.futsal/>
  },
  {
    id: "2",
    name: "Basket",
    icon: <CategoryIcons.basket/>
  },
  {
    id: "3",
    name: "Badminton",
    icon: <CategoryIcons.badminton/>
  },
  {
    id: "4",
    name: "Volley",
    icon: <CategoryIcons.voli/>
  },
  {
    id: "5",
    name: "Swimming",
    icon: <CategoryIcons.renang/>
  },
  {
    id: "6",
    name: "Bowling",
    icon: <CategoryIcons.bowling/>
  },
  {
    id: "7",
    name: "Tennis",
    icon: <CategoryIcons.tenis/>
  },
];

const CategoryRender = ({ item }) => {
  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.imageContainer}>
        
        {item.icon}
      </View>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
};

const Category = () => {
  return (
    <GroupContentLayout title={"Category"}>
      <SwipeableContent data={CATEGORY_DATA} renderItem={CategoryRender} />
    </GroupContentLayout>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    width: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    color: COLOR.second800,
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 10,
    color: COLOR.second800,
  },
});
