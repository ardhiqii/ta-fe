import React, { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import CustomModal from "@components/CustomModal";
import Input from "@components/Input";
import EditInformationContent from "./EditMode/EditInformationContent";
import { Location } from "util/location";
import { Currency } from "util/currency";

const InformationContent = ({
  description,
  geo_coordinate,
  is_bike_parking,
  is_car_parking,
  is_public,
  rules,
  price_per_hour,
}) => {
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState("Getting Address...");
  useEffect(() => {
    const gettingAddress = async () => {
      try {
        const coor = geo_coordinate.split(",");
        const adrs = await Location.getAddress(coor[0], coor[1]);
        setAddress(adrs);
      } catch (e) {
        console.log(e);
      }
    };
    gettingAddress();
  }, []);

  const navigateToMap = () => {
    const coor = geo_coordinate.split(",");
    const url = `https://www.google.com/maps/search/?api=1&query=${coor[0]},${coor[1]}`;
    Linking.openURL(url);
  };
  const INFO_BUTTON = [
    {
      value: address,
      button: "Open Map",
      icon: "location-outline",
      onPress: navigateToMap,
    },
    {
      value: description,
      icon: "information-circle-outline",
      onPress: () => {},
    },
  ];
  return (
    <View>
      <View style={styles.darkerContainer} />
      <View style={styles.container}>
        <View>
          <Text style={styles.subText}>Venue</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>This venue is currently </Text>
            <Text style={{ fontFamily: LEXEND.Bold, fontSize: 12 }}>
              {is_public ? "public" : "private"}
            </Text>
          </View>
        </View>

        {INFO_BUTTON.map((info, i) => (
          <InfoWithButton key={i} {...info} />
        ))}

        <View>
          <Text style={styles.subText}>Rules</Text>
          <Text style={styles.text}>{rules}</Text>
        </View>

        <View style={{ rowGap: 4 }}>
          <Text style={styles.subText}>Parking lot</Text>
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            <ParkingIcon
              name={"CAR"}
              icon={"car-outline"}
              selected={!!is_car_parking}
            />
            <ParkingIcon
              name={"BIKE"}
              icon={"bicycle"}
              selected={!!is_bike_parking}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default InformationContent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 12,
  },
  layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: COLOR.base700,
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    paddingVertical: 5,
    borderRadius: 5,
  },
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold, fontSize: 12 },
  buttonRead: {
    textAlign: "center",
    fontFamily: LEXEND.SemiBold,
    color: COLOR.base900,
  },
});

const InfoWithButton = ({ value, icon, customIcon, button, onPress }) => {
  return (
    <View style={styles.layout}>
      <View
        style={[
          { flexDirection: "row", columnGap: 5 },
          button && { width: "60%" },
        ]}
      >
        {!icon && customIcon}
        {icon && <Ionicons name={icon} size={22} color={COLOR.base900} />}
        <Text style={styles.text}>{value}</Text>
      </View>
      {button && (
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          <Text
            style={{
              fontFamily: LEXEND.Regular,
              fontSize: 10,
              color: COLOR.base700,
            }}
          >
            {button}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const ParkingIcon = ({ name, icon, selected }) => {
  return (
    <View
      style={[
        stylesButton.container,
        selected && {
          borderColor: COLOR.base900,
          backgroundColor: COLOR.base900,
        },
      ]}
    >
      <View style={{}}>
        <Ionicons
          name={icon}
          size={20}
          color={selected ? "white" : COLOR.second300}
        />
      </View>
      <Text style={[stylesButton.text, selected && { color: "white" }]}>
        {name}
      </Text>
    </View>
  );
};

const stylesButton = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.second300,
    width: 80,
    justifyContent: "center",
    paddingVertical: 4,
    flexDirection: "row",
    columnGap: 2,
  },
  text: {
    color: COLOR.second300,
    fontFamily: LEXEND.SemiBold,
  },
});
