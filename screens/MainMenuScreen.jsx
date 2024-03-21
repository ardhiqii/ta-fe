import ButtonItemMenu from "@components/MainMenuContent/ButtonItemMenu";
import ItemsMenu from "@components/MainMenuContent/ItemsMenu";
import React from "react";
import { Text, View } from "react-native";
const MainMenuScreen = () => {
  return (
    <View>
      <View>
        <Text>Profile</Text>
      </View>
      <View>
        <Text>Admin thingy</Text>
        <ItemsMenu role="admin" />
      </View>
      <View>
        <Text>General thingy</Text>
        <ItemsMenu />
      </View>
    </View>
  );
};

export default MainMenuScreen;
