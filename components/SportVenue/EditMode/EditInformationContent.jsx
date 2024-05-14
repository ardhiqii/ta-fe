import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "@components/Input";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Location } from "util/location";
import DateTimePicker from "@react-native-community/datetimepicker";
import LoadingOverlay from "@components/LoadingOverlay";

const EditInformationContent = ({
  description,
  rules,
  is_bike_parking,
  is_car_parking,
  is_public,
  setNewData,
  oldData,
}) => {
  const [address, setAddress] = useState("Press Pick on Map for location");
  const [showOpen, setShowOpen] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [dataTime, setDataTime] = useState({
    open: new Date(),
    close: new Date(),
    init_open: true,
    init_close: true,
  });
  const nav = useNavigation();
  const route = useRoute();
  const type = route?.params?.type;
  useEffect(() => {
    const initData = async () => {
      try {
        updateInputHandler("is_public", oldData.is_public | is_public);
        updateInputHandler(
          "is_bike_parking",
          oldData.is_bike_parking | is_bike_parking
        );
        updateInputHandler(
          "is_car_parking",
          oldData.is_car_parking | is_car_parking
        );

        if (oldData.geo_coordinate) {
          const coor = oldData.geo_coordinate.split(",");
          const adrs = await Location.getAddress(coor[0], coor[1]);
          setAddress(adrs);
        }
      } catch (e) {
        console.log("Error occured in EditInformationContent");
        console.log(e);
      }
    };
    initData();
  }, []);

  useEffect(() => {
    const gettingAddress = async () => {
      if (route?.params?.pickedLat) {
        console.log("GETTING ADDRESS");
        setAddress("Getting Address...")
        const adrs = await Location.getAddress(
          route.params.pickedLat,
          route.params.pickedLng
        );
        const geo = `${route.params.pickedLat}, ${route.params.pickedLng}`;
        updateInputHandler("geo_coordinate", geo);
        setAddress(adrs);
      }
    };
    gettingAddress();
  }, [route?.params?.pickedLat]);

  const navigateToMap = () => {
    nav.navigate("Map", { type: type });
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

  const updateTimeHandler = (inputIdentifier, event, value) => {
    setShowOpen(false);
    setShowClose(false);

    setDataTime((prev) => {
      const init = "init_" + inputIdentifier;
      return { ...prev, [inputIdentifier]: value, [init]: false };
    });
    const convert = convertToHourMinute(value) + ":00";
    console.log(convert);

    if (inputIdentifier === "open") {
      updateInputHandler("time_open", convert);
    } else {
      updateInputHandler("time_closed", convert);
    }
  };

  const convertToHourMinute = (date) => {
    const h = date.getHours();
    const m = date.getMinutes();
    const paddedMinute = m < 10 ? `0${m}` : `${m}`;

    return `${h}:${paddedMinute}`;
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
            {address}
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
        <Ionicons
          name="information-circle-outline"
          size={22}
          color={COLOR.base900}
        />
        <Input
          placeholder={
            oldData.description ? oldData.description : "Description"
          }
          value={description}
          onUpdateValue={updateInputHandler.bind(this, "description")}
        />
      </View>

      <Text style={styles.subText}>Rules</Text>
      <Input
        placeholder={oldData.rules ? oldData.rules : "Rules"}
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
      <Input
        placeholder={
          oldData.price_per_hour ? oldData.price_per_hour.toString() : "Price"
        }
        keyboardType="number-pad"
        onUpdateValue={updateInputHandler.bind(this, "price_per_hour")}
      />

      <Text style={styles.subText}>Time</Text>
      <View style={{ flexDirection: "row", columnGap: 40 }}>
        <View style={styles.timeContainer}>
          <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>Open</Text>
          <Pressable
            style={styles.timeButton}
            onPress={() => setShowOpen(true)}
          >
            <Text style={dataTime.init_open && { color: COLOR.border }}>
              {dataTime.init_open && !!oldData.time_open
                ? oldData.time_open.slice(0, -3)
                : dataTime.init_open
                ? "00:00"
                : convertToHourMinute(dataTime.open)}
            </Text>
          </Pressable>
        </View>
        <View style={styles.timeContainer}>
          <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>Close</Text>
          <Pressable
            style={styles.timeButton}
            onPress={() => setShowClose(true)}
          >
            <Text style={dataTime.init_close && { color: COLOR.border }}>
              {dataTime.init_close && !!oldData.time_closed
                ? oldData.time_closed.slice(0, -3)
                : dataTime.init_close
                ? "00:00"
                : convertToHourMinute(dataTime.close)}
            </Text>
          </Pressable>
        </View>
      </View>

      {showOpen && (
        <DateTimePicker
          value={dataTime.open}
          mode="time"
          is24Hour={true}
          onChange={updateTimeHandler.bind(this, "open")}
        />
      )}
      {showClose && (
        <DateTimePicker
          value={dataTime.close}
          mode="time"
          is24Hour={true}
          onChange={updateTimeHandler.bind(this, "close")}
        />
      )}
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
  timeContainer: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
  },
  timeButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLOR.border,
    width: 60,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
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
