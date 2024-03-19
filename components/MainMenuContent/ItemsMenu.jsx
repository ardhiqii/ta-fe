import React from "react";
import { StyleSheet, View } from "react-native";
import ButtonItemMenu from "./ButtonItemMenu";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "COLOR";
const ADMIN_ITEMS = [
  {
    id: "1",
    name: "Sport Venue",
    customIcon: (
      <MaterialCommunityIcons
        name="soccer-field"
        size={24}
        color={COLOR.base800}
      />
    ),
    navigate: "ListSportVenueAdmin",
  },
];

const GENERAL_ITEMS = [
  {
    id: "1",
    name: "Transaction",
    ioniconsName: "receipt-outline",
    navigate: "",
  },
  {
    id: "2",
    name: "Match",
    ioniconsName: "calendar-outline",
    navigate: "",
  },
  {
    id: "3",
    name: "Notification",
    ioniconsName: "notifications-outline",
    navigate: "",
  },
  {
    id: "4",
    name: "Chat",
    ioniconsName: "chatbubble-outline",
    navigate: "",
  },
];

const ItemsMenu = ({ role = "player" }) => {
  const nav = useNavigation();
  const list_items = role === "player" ? GENERAL_ITEMS : ADMIN_ITEMS;
  return (
    <View style={styles.container}>
      {list_items.map((item, i) => (
        <ButtonItemMenu
          key={i}
          ioniconsName={item.ioniconsName}
          customIcon={item.customIcon}
          customStyleContainer={{ paddingHorizontal: 25 }}
          onPress={() => {
            nav.pop();
            nav.navigate("SportVenueNavigation", {
              screen: item.navigate,
            });
          }}
        >
          {item.name}
        </ButtonItemMenu>
      ))}
    </View>
  );
};

export default ItemsMenu;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    rowGap: 12,
    borderBottomWidth: 4,
    borderColor: "#e0e0e0",
  },
});
