import CustomTopNavigation from "@components/CustomTopNavigation";
import Category from "@components/HomeContent/Category";
import GroupContentLayout from "@components/HomeContent/GroupContentLayout";
import Recommend from "@components/HomeContent/Recommend";
import ModifyCategoryVenue from "@components/SportVenue/Manage/ModifyCategoryVenue";

import React, { useContext } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
const HomeScreen = () => {
  const { user } = useContext(UserContext);
  console.log("#### HOME SCREEN ###");
  console.log(user);
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      <CustomTopNavigation />
      <ScrollView contentContainerStyle={styles.container}>
        <Category />
        <Recommend />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 20,
    paddingBottom: 20,
  },
});
