import SwipeableContent from "@components/HomeContent/SwipeableContent";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BoxDate = ({ item, selected, onSelect,includedDate }) => {
  const { id, day, month, dayOfWeek } = item;
  const isSelected = selected === id;
  const include = includedDate.includes(id)
  return (
    <Pressable
      style={({ pressed }) => [
        BoxStyles.container,
        include && {backgroundColor:"#c8eef0"} ,
        isSelected && BoxStyles.pressedContainer,
      ]}
      onPress={() => onSelect(id)}
    >
      {({ pressed }) => {
        return (
          <>
            <Text
              style={[
                BoxStyles.text,
                { fontSize: 10, fontFamily: LEXEND.Light },
                isSelected && { color: COLOR.base500 },
              ]}
            >
              {day} {month}
            </Text>
            <Text
              style={[
                BoxStyles.text,
                { fontSize: 12, fontFamily: LEXEND.SemiBold },
                isSelected && { color: COLOR.base500 },
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

const ScheduleContent = ({ setDate,orderData }) => {
  const [dateData, setDateData] = useState([]);
  const [selected, setSelected] = useState();
  const [includedDate, setIncludedDate] = useState([])
  const formattedYearMonthDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const id = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    return id
  };

  const selectedDateHandler = (formattedId) =>{
    setSelected(formattedId)
    setDate(formattedId)
  }

  useEffect(() => {
    const initDates = () => {
      const today = new Date();
      const formatted = formattedYearMonthDate(today)
      selectedDateHandler(formatted)
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 20);
      const dates = [];
      let currDate = new Date(today);

      while (currDate <= futureDate) {
        const formattedDate = {
          id: formattedYearMonthDate(currDate),
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

  useEffect(()=>{
    const temp = orderData.map((m)=> m.date)
    setIncludedDate(temp)
  },[orderData])

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
        <BoxDate item={item} selected={selected} onSelect={selectedDateHandler} includedDate={includedDate} />
      )}
    />
  );
};

export default ScheduleContent;
