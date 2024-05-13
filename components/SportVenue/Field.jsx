import SwipeableContent from "@components/HomeContent/SwipeableContent";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOR } from "COLOR";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Admin } from "util/admin/admin";
import TimeDisplay from "./TimeDisplay";
import { Player } from "util/player/player";

const Field = ({
  id,
  number,
  category,
  selected = [],
  price,
  Sport_Field_id: idVenue,
  time_open,
  time_closed = 21,
  onChangeSelected,
  updateDataFromResponse,
  date,
}) => {
  const [timesData, setTimesData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [blacklist, setBlacklist] = useState([]);
  const [currBlacklist, setCurrBlacklist] = useState();
  const [reserved, setReserved] = useState([]);
  const [currReserved,setCurrReserved] = useState([])

  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 20);
  const nowMonth = today.getMonth() + 1;
  const futureMonth = futureDate.getMonth() + 1;
  const nav = useNavigation();
  const route = useRoute();
  const editMode = route?.params?.editMode;

  useEffect(() => {
    setLoading(true);
    fetchBlacklist();
    fetchReserved()
    const sh = time_open.split(":")[0];
    const eh = time_closed.split(":")[0];
    const times = generateTimes(sh, eh, 60);
    setTimesData(times);
    setLoading(false);
  }, []);

  useEffect(() => {

    let times = [];
    const filtered = blacklist?.filter((b) => b.date === date);
    filtered?.map((f) => {
      const sh = f?.fromTime.split(":")[0];
      const eh = f?.toTime.split(":")[0];
      const curr = generateTimes(sh, eh, 60);
      times = times.concat(curr);
    });

    setCurrBlacklist(times);

    const convertDate = new Date(date);
    const dayNumber = convertDate.getDate()
    const year = convertDate.getFullYear();
    const monthName = convertDate.toLocaleString('default', { month: 'long' });

    const fullDate = `${dayNumber} ${monthName} ${year}`

    let timesReserved = []
    const filteredReserved = reserved?.filter((r)=>{
      let currDate = r.date.split(" ")
      currDate =  `${currDate[1]} ${currDate[2]} ${currDate[3]}`
      return currDate === fullDate
    })

    filteredReserved?.map((f) => {
      const sh = f?.time_start.split(":")[0];
      const eh = f?.time_end.split(":")[0];
      const curr = generateTimes(sh, eh, 60);
      timesReserved = timesReserved.concat(curr);
    });

    setCurrReserved(timesReserved)


  }, [reserved,blacklist, date]);

  const fetchBlacklist = async () => {
    try {
      const data = await Promise.all([
        Player.SportVenue.getBlacklistFieldById(
          TOKEN_TEMPORARY,
          id,
          nowMonth,
          today.getFullYear()
        ),
        Player.SportVenue.getBlacklistFieldById(
          TOKEN_TEMPORARY,
          id,
          futureMonth,
          futureDate.getFullYear()
        ),
      ]);
      const bl =
        nowMonth !== futureMonth
          ? data[0].data.concat(data[1].data)
          : data[0].data;
      setBlacklist(bl);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchReserved = async() =>{
    try {
      const data = await Promise.all([
        Player.SportVenue.getReservedFieldById(
          TOKEN_TEMPORARY,
          id,
          nowMonth,
          today.getFullYear()
        ),
        Player.SportVenue.getReservedFieldById(
          TOKEN_TEMPORARY,
          id,
          futureMonth,
          futureDate.getFullYear()
        ),
      ]);
      const bl =
        nowMonth !== futureMonth
          ? data[0].data.concat(data[1].data)
          : data[0].data;
    setReserved(bl)
    } catch (e) {
      console.log(e);
    }
  }

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
    return times;
  };

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
      if (data) {
        updateDataFromResponse(data);
      }
    } catch (e) {
      console.log("Error occured in deleteFieldIdHandler, in Field", e);
    }
  };

  const navigateToBlacklist = () => {
    nav.navigate("ManageBlacklistSchedule", {
      idVenue: idVenue,
      idField: id,
      number: number,
    });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading field</Text>
      </View>
    );
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
          {editMode && (
            <View style={{ flexDirection: "row", columnGap: 12 }}>
              <Text onPress={navigateToBlacklist}>Schedule</Text>
              <Text onPress={alertDeleteFieldId}>Delete</Text>
            </View>
          )}
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
                id={id}
                value={item}
                key={item}
                selectedTimes={selected}
                onChangeSelected={onChangeSelected}
                dataBlacklist={currBlacklist}
                dataReserved= {currReserved}
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
