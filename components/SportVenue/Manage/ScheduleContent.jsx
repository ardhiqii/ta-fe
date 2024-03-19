import SwipeableContent from "@components/HomeContent/SwipeableContent";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BoxDate = ({ item, selected, onSelect }) => {
  const { id, day, month, dayOfWeek } = item;
  const isSelected = selected === id;
  return (
    <Pressable
      style={({ pressed }) => [
        BoxStyles.container,
        isSelected && BoxStyles.pressedContainer,
      ]}
      onPress={()=>onSelect(id)}
    >
      {({ pressed }) => {
        return (
          <>
            <Text
              style={[
                BoxStyles.text,
                { fontSize: 10, fontFamily: LEXEND.Light },
                isSelected && { color: "#edf8f2" },
              ]}
            >
              {day} {month}
            </Text>
            <Text
              style={[
                BoxStyles.text,
                { fontSize: 12, fontFamily: LEXEND.SemiBold },
                isSelected && { color: "#edf8f2" },
              ]}
            >
              {dayOfWeek}
            </Text>
          </>
        );
      }}
    </Pressable>
  );
};

const BoxStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.second300,
    alignItems: "center",
    width: 64,
    paddingVertical: 5,
  },
  text: {
    color: COLOR.second300,
  },
  pressedContainer: {
    borderColor: COLOR.base900,
    backgroundColor: COLOR.base900,
  },
});

const ScheduleContent = () => {
  const [dateData, setDateData] = useState([]);
  const [selected, setSelected] = useState();
  useEffect(() => {
    const initDates = () => {
      const today = new Date();
      setSelected(today.toISOString());
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 20);
      const dates = [];
      let currDate = new Date(today);

      while (currDate <= futureDate) {
        const formattedDate = {
          id: currDate.toISOString(),
          day: currDate.getDate(),
          month: currDate.toLocaleString("default", { month: "short" }),
          dayOfWeek: currDate.toLocaleString("default", { weekday: "short" }),
        };
        dates.push(formattedDate);
        currDate.setDate(currDate.getDate() + 1);
      }
      setDateData(dates);
    };

    initDates();
  }, []);
  if (!dateData)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  return (
    <SwipeableContent
      data={dateData}
      renderItem={({ item }) => (
        <BoxDate item={item} selected={selected} onSelect={setSelected} />
      )}
    />
  );
};

export default ScheduleContent;
