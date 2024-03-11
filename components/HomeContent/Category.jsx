import React from "react";
import GroupContentLayout from "./GroupContentLayout";
import SwipeableContent from "./SwipeableContent";
import { StyleSheet, Text, View } from "react-native";
import {Entypo} from "@expo/vector-icons"
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
const CATEGORY_DATA = [
  {
    id: "1",
    name: "FootBall",
  },
  {
    id: "2",
    name: "Basket",
  },
  {
    id: "3",
    name: "Badminton",
  },
  {
    id: "4",
    name: "Volley",
  },
  {
    id: "5",
    name: "Swimming",
  },
  {
    id: "6",
    name: "Bowling",
  },
  {
    id: "7",
    name: "Tennis",
  },
];

const CategoryRender = ({ item }) => {
  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.imageContainer}>
        <Entypo name="cross" size={48} color={COLOR.second800}/>
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
  container:{
    width:64,
    justifyContent:'center',
    alignItems:'center'
  },
  imageContainer:{
    borderWidth:1,
    color:COLOR.second800
  },
  text:{
    fontFamily:LEXEND.Regular,
    fontSize:10,
    color:COLOR.second800
  }
})