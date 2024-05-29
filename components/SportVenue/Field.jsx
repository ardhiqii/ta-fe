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
import { useContext } from "react";
import { UserContext } from "store/user-contex";
import { generateTimes } from "util/admin/generate_times";

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
  blacklistData = [],
  reservedData = [],
  date,
}) => {
  const [timesData, setTimesData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [blacklist, setBlacklist] = useState([]);
  const [currBlacklist, setCurrBlacklist] = useState();
  const [reserved, setReserved] = useState([]);
  const [currReserved, setCurrReserved] = useState([]);

  const { user } = useContext(UserContext);
  const nav = useNavigation();
  const route = useRoute();
  const editMode = route?.params?.editMode;

  const filteredBlacklist = blacklistData?.filter((b) => b.date === date);

  const filteredReserved = reservedData?.filter((r) => {
    const fullDate = convertToFullDate(date);
    let currDate = r.date.split(" ");
    currDate = `${parseInt(currDate[1])} ${currDate[2]} ${currDate[3]}`;

    return currDate == fullDate;
  });

  const initData = async () => {
    setLoading(true);
    try {
      const times = generateTimes(time_open, time_closed, date);
      setTimesData(times);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, [date]);

  useEffect(() => {
    let times = [];

    const convertDate = new Date(date);
    const dayNumber = convertDate.getDate();
    const year = convertDate.getFullYear();
    const monthName = convertDate.toLocaleString("default", { month: "long" });

    const fullDate = `${dayNumber} ${monthName} ${year}`;

    let timesReserved = [];
    const filteredReserved = reserved?.filter((r) => {
      let currDate = r.date.split(" ");
      currDate = `${currDate[1]} ${currDate[2]} ${currDate[3]}`;
      return currDate === fullDate;
    });

    filteredReserved?.map((f) => {
      const curr = generateTimes(f?.time_start, f?.time_end, date);
      timesReserved = timesReserved.concat(curr);
    });
    setCurrReserved(timesReserved);
  }, [reserved, blacklist, date]);

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
        user.token,
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

      {/* ###### NEW VERSION ######### */}
      {timesData && (
        <SwipeableContent
          data={timesData}
          renderItem={({ item }) => {
            const blacklisted = checkingIsBlacklisted(
              item,
              date,
              filteredBlacklist
            );

            const isReserved = checkingIsReserved(item, date, filteredReserved);

            return (
              <TimeDisplay
                id={id}
                value={item}
                key={item}
                blacklisted={blacklisted}
                selectedTimes={selected}
                isReserved={isReserved}
                onChangeSelected={onChangeSelected}
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

const checkingIsBlacklisted = (time, date, blacklist = []) => {
  let blDisabled = false;
  const arrTime = time.split("UNTIL");
  const sTime = new Date(arrTime[0]);
  const eTime = new Date(arrTime[1]);
  if (blacklist.length !== 0) {
    blacklist.map((b) => {
      const sbTime = convertToDate(b.fromTime, date);
      const ebTime = convertToDate(b.toTime, date);

      blDisabled = sTime < ebTime && sbTime < eTime
    });
  }
  return blDisabled;
};

const checkingIsReserved = (time, date, reserve = []) => {
  let disabled = false;
  const arrTime = time.split("UNTIL");
  const sTime = new Date(arrTime[0]);
  const eTime = new Date(arrTime[1]);
  if (reserve.length !== 0) {
    reserve.map((b) => {
      const sbTime = convertToDate(b.time_start, date);
      const ebTime = convertToDate(b.time_end, date);

      disabled = sbTime <= sTime && eTime <= ebTime;
    });
  }
  return disabled;
};

const convertToDate = (time, date) => {
  const splitStart = time.split(":");
  const sHour = parseInt(splitStart[0]);
  const sMinute = parseInt(splitStart[1]);
  const sDate = !!date ? new Date(date) : new Date();
  sDate.setHours(sHour, sMinute, 0, 0);
  return sDate;
};

const convertToFullDate = (date) => {
  const convertDate = new Date(date);
  const dayNumber = convertDate.getDate();
  const year = convertDate.getFullYear();
  const monthName = convertDate.toLocaleString("default", { month: "short" });

  const fullDate = `${dayNumber} ${monthName} ${year}`;
  return fullDate;
};
