import CustomTopNavigation from "@components/CustomTopNavigation";
import Category from "@components/HomeContent/Category";
import Nearest from "@components/HomeContent/Nearest";

import Recommend from "@components/HomeContent/Recommend";
import { LEXEND } from "@fonts/LEXEND";
import ListSportVenuesScreen from "@screens/SportVenue/Admin/ListSportVenuesScreen";
import { TEMPORARY_ROLE } from "constant/DUMMY_ROLE";

import React, { useContext } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
const HomeScreen = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return;
  }
  const isAdmin = user.role === "admin";
  console.log("#### HOME SCREEN ###");
  console.log(user);

  const PlayerHomeScreen = () => {
    return (
      <>
        <Category />
        <Nearest />
      </>
    );
  };

  const AdminHomeScreen = () => {
    return (
      <View style={{ marginTop: 20, flexGrow: 1 }}>
        <Text style={{ fontFamily: LEXEND.Bold, textAlign: "center" }}>
          Your Sport Venue
        </Text>
        <ListSportVenuesScreen />
      </View>
    );
  };

  return (
    <>
      <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content" />
      {!isAdmin && <CustomTopNavigation />}
      <ScrollView contentContainerStyle={styles.container}>
        {isAdmin ? <AdminHomeScreen /> : <PlayerHomeScreen />}
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
    flexGrow: 1,
  },
});
