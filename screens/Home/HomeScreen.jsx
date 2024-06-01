import CustomTopNavigation from "@components/CustomTopNavigation";
import Category from "@components/HomeContent/Category";
import Nearest from "@components/HomeContent/Nearest";

import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import ListSportVenuesScreen from "@screens/SportVenue/Admin/ListSportVenuesScreen";

import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";

const HomeScreen = () => {
  const [timesData, setTimesData] = useState([]);
  const { user, logoutUser } = useContext(UserContext);
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
      <View style={{ flexGrow: 1 }}>
        <ListSportVenuesScreen />
      </View>
    );
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      {!isAdmin && <CustomTopNavigation />}
      <ScrollView contentContainerStyle={styles.container}>
        {isAdmin ? <AdminHomeScreen /> : <PlayerHomeScreen />}

        <Button onPress={logoutUser}>Logout</Button>
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
