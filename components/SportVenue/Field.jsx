import SwipeableContent from "@components/HomeContent/SwipeableContent";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

const Field = ({ id, name, category, price, onChangeSelected }) => {
  const [timesData, setTimesData] = useState([]);
  const [selectedTimes, setSeletectedTimes] = useState([]);

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
    generateTimes(8, 12, 60);
  }, []);

  useEffect(() => {
    onChangeSelected(id, selectedTimes);
  }, [selectedTimes]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", columnGap: 6 }}>
          <Text style={styles.text}>{name}</Text>
          <TagCategory category={category} />
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
