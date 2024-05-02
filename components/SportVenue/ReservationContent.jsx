import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ScheduleContent from "./ScheduleContent";
import ListFieldsContent from "./ListFieldsContent";

const ReservationContent = ({
  fieldsData,
  category,
  time_open,
  time_closed,
}) => {
  const [order, setOrder] = useState([]);
  const [date, setDate] = useState();

  // useEffect(() => {
  //   console.log("CHECKING ORDER IN RESERVEATIONCONTENT");
  //   console.log(order);
  //   }, [order]);

  const orderHandler = (date, fieldsData) => {
    // const selectedFields = [];
    // fieldsData.map((field) => {
    //   if (field.selected.length !== 0) {
    //     const selectedField = {
    //       id: field.id,
    //       idVenue: field.Sport_Field_id,
    //       number: field.number,
    //       selectedTime: field.selected,
    //     };
    //     selectedFields.push(selectedField);
    //   }
    // });

    // if (selectedFields.length === 0) {
    //   return;
    // }
    let isNewDate = true;
    order.map((prev) => {
      if (prev.date == date) {
        isNewDate = false;
      }
    });
    if (isNewDate) {
      const newOrder = {
        date: date,
        fieldsData:fieldsData,
      };
      // console.log(newOrder);
      setOrder((prev) => [...prev, newOrder]);
    } else {
      setOrder((prev) => {
        return prev.map((order) => {
          if (order.date === date) {
            return { ...order, fieldsData: fieldsData };
          }
          return order;
        });
      });
    }

    // if (isNewDate) {
    //   console.log("IN NEW DATE");
    //   const newOrder = {
    //     date: date,
    //     selectedFields: selectedFields,
    //   };
    //   // console.log(newOrder);
    //   setOrder((prev) => [...prev, newOrder]);
    // } else {
    //   console.log("IN NOT NEW DATE");
    //   setOrder((prev) => {
    //     return prev.map((order) => {
    //       if (order.date === date) {
    //         return { ...order, selectedFields: selectedFields };
    //       }
    //       return order;
    //     });
    //   });
    // }
  };

  return (
    <View style={{ rowGap: 12 }}>
      <ScheduleContent setDate={setDate} />
      <BorderLine
        customStyle={{
          borderBottomWidth: 2,
          borderStyle: "dashed",
          paddingTop: 2,
        }}
      />
      <ListFieldsContent
        data={fieldsData}
        category={category}
        time_closed={time_closed}
        time_open={time_open}
        date={date}
        onChangeOrder={orderHandler}
      />
    </View>
  );
};

export default ReservationContent;

const BorderLine = ({ customStyle }) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: 4,
          borderColor: "#eceff1",
        },
        customStyle,
      ]}
    />
  );
};
