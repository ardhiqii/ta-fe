import CustomTopNavigation from "@components/CustomTopNavigation";
import Category from "@components/HomeContent/Category";
import Nearest from "@components/HomeContent/Nearest";

import Recommend from "@components/HomeContent/Recommend";
import { TEMPORARY_ROLE } from "constant/DUMMY_ROLE";

import React, { useContext } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const isAdmin = TEMPORARY_ROLE === "admin";
  console.log("#### HOME SCREEN ###");
  console.log(user);
  return (
    <>
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      <CustomTopNavigation />
      <ScrollView contentContainerStyle={styles.container}>
        <Category />
        {!isAdmin && (
          <>
            <Nearest />
          </>
        )}
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
