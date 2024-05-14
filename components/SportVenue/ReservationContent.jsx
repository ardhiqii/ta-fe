import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ScheduleContent from "./ScheduleContent";
import ListFieldsContent from "./ListFieldsContent";
import { TEMPORARY_ROLE } from "constant/DUMMY_ROLE";
import { Player } from "util/player/player";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import Button from "@components/UI/Button";
import { useNavigation } from "@react-navigation/native";

const ReservationContent = ({
  name,
  fieldsData,
  category,
  time_open,
  time_closed,
  pricePerHour,
  orders,
  setOrders
}) => {
  // const [order, setOrder] = useState([]);
  const [date, setDate] = useState();
  const nav = useNavigation();
  const isAdmin = TEMPORARY_ROLE === "admin";

  // useEffect(() => {
  //   console.log("CHECKING ORDER IN RESERVEATIONCONTENT");
  //   console.log("##### order", order);
  // }, [order]);



  const orderHandler = (date, fieldsData) => {
    const newOrder = {
      date: date,
      fieldsData: fieldsData,
    };
    let isNewDate = true;
    let updateOrder = orders.map((o) => {
      if (o.date === date) {
        isNewDate = false;
        return { ...o, fieldsData: fieldsData };
      } else {
        return o;
      }
    });

    if (isNewDate) {
      updateOrder.push(newOrder);
    }
    updateOrder = updateOrder.filter((o) => o.fieldsData.length !== 0);
    setOrders(updateOrder);
  };

  return (
    <>
      <View style={{ rowGap: 12 }}>
        <ScheduleContent setDate={setDate} orderData={orders} />
        <BorderLine
          customStyle={{
            borderBottomWidth: 2,
            borderStyle: "dashed",
            paddingTop: 2,
          }}
        />
        <ListFieldsContent
          orderData={orders}
          defaultData={fieldsData}
          category={category}
          time_closed={time_closed}
          time_open={time_open}
          date={date}
          onChangeOrder={orderHandler}
        />
      </View>
      
    </>
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
