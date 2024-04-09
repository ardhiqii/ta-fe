import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "@components/Input";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Location } from "util/location";

const EditInformationContent = ({
  location,
  number,
  description,
  rules,
  is_bike_parking,
  is_car_parking,
  is_public,
  setNewData,
}) => {
  const [address, setAddress] = useState("");
  const nav = useNavigation();
  const route = useRoute();
  useEffect(() => {
    const gettingAddress = async () => {
      if (route.params.pickedLat) {
        const adrs = await Location.getAddress(
          route.params.pickedLat,
          route.params.pickedLng
        );
        const geo = `${route.params.pickedLat}, ${route.params.pickedLng}`
        updateInputHandler("geo_coordinate",geo);
        setAddress(adrs);
      }
    };
    gettingAddress();
  }, [route.params.pickedLat]);
  const navigateToMap = () => {
    nav.navigate("Map", { idVenue: route.params.idVenue });
  };

  const updateInputHandler = (inputIdentifier, value) => {
    setNewData((prev) => {
      return { ...prev, [inputIdentifier]: value };
    });
  };

  const updateParkingHandler = (inputIdentifier) => {
    if (inputIdentifier === "bike") {
      const value = !is_bike_parking ? 1 : 0;
      updateInputHandler("is_bike_parking", value);
    } else {
      const value = !is_car_parking ? 1 : 0;
      updateInputHandler("is_car_parking", value);
    }
  };

  const updateVisibilityVenue = () => {
    const value = !is_public ? 1 : 0;
    updateInputHandler("is_public", value);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subText}>Venue</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: LEXEND.Light, color: COLOR.second700 }}>
            This venue is currently{" "}
            <Text style={{ fontFamily: LEXEND.Bold }}>
              {is_public ? "public" : "private"}
            </Text>
          </Text>
          <Pressable
            style={{
              borderWidth: 2,
              borderRadius: 5,
              width: 70,
              paddingVertical: 3,
              justifyContent: "center",
              alignItems: "center",
              borderColor: COLOR.base900,
            }}
          >
            <Text
              onPress={updateVisibilityVenue}
              style={{
                fontFamily: LEXEND.Light,
                fontSize: 12,
                color: COLOR.base900,
              }}
            >
              Change
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.locContainer, { alignItems: "flex-start" }]}>
        <Ionicons name="location-outline" size={22} color={COLOR.base900} />
        <View style={{ rowGap: 4 }}>
          <Text
            style={{
              fontFamily: LEXEND.Light,
              color: COLOR.second700,
              fontSize: 12,
            }}
          >
            {address ? address : "Press Pick on Map for location"}
          </Text>
          <View style={{ flexDirection: "row", columnGap: 5 }}>
            <Pressable style={styles.locButton} onPress={navigateToMap}>
              <Text
                style={{
                  fontFamily: LEXEND.Light,
                  color: COLOR.base900,
                  fontSize: 12,
                }}
              >
                Pick on Map
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.locContainer}>
        <Ionicons name="call-outline" size={22} color={COLOR.base900} />
        <Input placeholder={"Number Contact"} keyboardType="phone-pad" />
      </View>

      <View style={styles.locContainer}>
        <Ionicons
          name="information-circle-outline"
          size={22}
          color={COLOR.base900}
        />
        <Input
          placeholder={"Description"}
          value={description}
          onUpdateValue={updateInputHandler.bind(this, "description")}
        />
      </View>

      <Text style={styles.subText}>Rules</Text>
      <Input
        placeholder={"Rules"}
        multiline={true}
        value={rules}
        onUpdateValue={updateInputHandler.bind(this, "rules")}
      />

      <Text style={styles.subText}>Parking</Text>
      <View style={{ flexDirection: "row", columnGap: 8 }}>
        <ButtonParking
          name={"BIKE"}
          icon={"bicycle"}
          selected={!!is_bike_parking}
          onPress={updateParkingHandler.bind(this, "bike")}
        />
        <ButtonParking
          name={"CAR"}
          icon={"car-outline"}
          selected={!!is_car_parking}
          onPress={updateParkingHandler.bind(this, "car")}
        />
      </View>

      <Text style={styles.subText}>Price</Text>
      <Input placeholder={"Price"} />
    </View>
  );
};

export default EditInformationContent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 12,
  },
  locContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  locButton: {
    borderWidth: 2,
    paddingHorizontal: 8,
    borderColor: COLOR.base900,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold },
});

const ButtonParking = ({ name, icon, onPress, selected }) => {
  return (
    <Pressable
      onPress={onPress}
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
    </Pressable>
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
