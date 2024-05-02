import SwipeableContent from "@components/HomeContent/SwipeableContent";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "COLOR";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Admin } from "util/admin/admin";

const TimeDisplay = ({ value, selectedTimes, setSeletectedTimes }) => {
  const selected = selectedTimes?.includes(value);
  const handleSelected = () => {
    if (selected) {
      setSeletectedTimes(selectedTimes.filter((time) => time != value));
    } else {
      setSeletectedTimes((prev) => [...prev, value]);
    }
  };
  return (
    <Pressable
      onPress={handleSelected}
      style={[timeStyles.container, selected && timeStyles.selectedContainer]}
    >
      <Text style={[timeStyles.text, selected && { color: COLOR.base500 }]}>
        {value}
      </Text>
    </Pressable>
  );
};

const timeStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.second300,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 3,
  },
  text: {
    color: COLOR.second300,
    fontFamily: LEXEND.Light,
    fontSize: 12,
  },
  selectedContainer: {
    borderColor: COLOR.base900,
    backgroundColor: COLOR.base900,
  },
});

const Field = ({
  id,
  number,
  category,
  price,
  Sport_Field_id: idVenue,
  time_open,
  time_closed = 21,
  onChangeSelected,
  updateDataFromResponse
}) => {
  const [timesData, setTimesData] = useState([]);
  const [selectedTimes, setSeletectedTimes] = useState([]);
  const nav = useNavigation()

  useEffect(() => {
    const generateTimes = (startHour, endHour, intervalInMinutes) => {
      const times = [];
      let currentMinute = startHour * 60;
      const endMinute = endHour * 60;
      while (currentMinute <= endMinute) {
        const hour = Math.floor(currentMinute / 60);
        const minute = currentMinute % 60;

        const next = currentMinute + intervalInMinutes;
        const nextH = Math.floor(next / 60);
        const nextM = next % 60;

        if (next > endMinute) break;
        // Format hour and minute with leading zero if needed
        let formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
        let formattedMinute = minute < 10 ? `0${minute}` : `${minute}`;
        const startFormatted = `${formattedHour}:${formattedMinute}`;
        formattedHour = nextH < 10 ? `0${nextH}` : `${nextH}`;
        formattedMinute = nextM < 10 ? `0${nextM}` : `${nextM}`;

        const endFormatted = `${formattedHour}:${formattedMinute}`;
        // Push formatted time to times array
        times.push(`${startFormatted} - ${endFormatted}`);

        // Increment time by the interval
        currentMinute = next;
      }
      setTimesData(times);
    };
    const sh = time_open.split(":")[0];
    const eh = time_closed.split(":")[0];
    generateTimes(sh, eh, 60);
  }, []);

  useEffect(() => {
    // console.log(selectedTimes);
    onChangeSelected(id, selectedTimes);
  }, [selectedTimes]);

  const alertDeleteFieldId = () => {
    Alert.alert("Confirmation", "Are you sure want to delete this field?", [
      {
        text: "Ok",
        onPress: deleteFieldIdHandler,
      },
      {
        text: "Cancel",
      },
    ]);
  };

  const deleteFieldIdHandler = async () => {
    const token =
      "fOf042XZqrW*MPcz4/0yBa9jce9ySHlHSn.Fa8++HS+kBFDMbEViaEl2doRd-Wb=+5fVp3EEmA1G/Cr/5T4)5u4k614aBM1DW1e6m0MTDaw1hl<N)MZm82o-V0tYU17s";

    try {
      const { data } = await Admin.SportVenue.deleteFieldById(
        TOKEN_TEMPORARY,
        idVenue,
        id
      );
      console.log("DELETE FIELD HANDLER DATA", data);
      if(data){
        updateDataFromResponse(data)
      }
    } catch (e) {
      console.log("Error occured in deleteFieldIdHandler, in Field", e);
    }
  };

  const navigateToBlacklist = () =>{
    nav.navigate("ManageBlacklistSchedule",{
      idVenue: idVenue,
      idField: id,
      number:number
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            flexDirection: "row",
            columnGap: 6,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", columnGap: 6 }}>
            <Text style={styles.text}>Field {number}</Text>
            <TagCategory category={category} />
          </View>
          <View style={{ flexDirection: "row", columnGap: 12 }}>
            <Text onPress={navigateToBlacklist}>Schedule</Text>
            <Text onPress={alertDeleteFieldId}>Delete</Text>
          </View>
        </View>
        <View>
          <Text
            style={[
              styles.text,
              { color: COLOR.base900, fontFamily: LEXEND.Regular },
            ]}
          >
            {price}
          </Text>
        </View>
      </View>
      {timesData && (
        <SwipeableContent
          data={timesData}
          renderItem={({ item }) => {
            return (
              <TimeDisplay
                value={item}
                key={item}
                selectedTimes={selectedTimes}
                setSeletectedTimes={setSeletectedTimes}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default Field;
const styles = StyleSheet.create({
  container: {
    rowGap: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 14,
    fontFamily: LEXEND.Light,
    color: COLOR.second700,
  },
});
