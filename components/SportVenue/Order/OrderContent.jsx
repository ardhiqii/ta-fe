import FieldOrder from "@components/SportVenue/Order/FieldOrder";
import TimeDisplay from "@components/SportVenue/TimeDisplay";
import { LEXEND } from "@fonts/LEXEND";
import { useRoute } from "@react-navigation/native";
import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Currency } from "util/currency";

const OrderContent = ({
  date,
  fieldsData,
  updateFieldsData,
  nameVenue,
  applyForAllFields,
}) => {
  const route = useRoute();
  const price = route?.params?.pricePerHour;
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    let totalMinutes = 0;
    fieldsData.map((f)=>{
      totalMinutes += f.totalMinutes
    })
    const { hours, minutes } = convertMinutesToHoursAndMinutes(totalMinutes);
    let tempPrice = hours * price
    tempPrice += (minutes/60) * price
    
    setTotalPrice(tempPrice);
  }, []);
  return (
    <View
      style={{
        rowGap: 12,
        borderWidth: 1,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          borderBottomWidth: 2,
          paddingVertical: 12,
          paddingHorizontal: 14,
          backgroundColor: COLOR.base500,
          borderColor: COLOR.base600,
          justifyContent:'space-between',
          flexDirection:'row',
          alignItems:'center'
        }}
      >
        <View>
          <Text style={{ fontFamily: LEXEND.Regular, fontSize: 16 }}>
            {nameVenue}
          </Text>
          <Text style={{ fontFamily: LEXEND.Light }}>Date: {date}</Text>
        </View>
        <Text style={{fontFamily:LEXEND.Bold,color:COLOR.accent2}}>Rp.{Currency.format(totalPrice)}</Text>
      </View>
      <View style={{ rowGap: 20 }}>
        {fieldsData.map((f, i) => {
          return (
            <>
              <FieldOrder
                key={f.id + date}
                {...f}
                updateFieldsData={updateFieldsData.bind(this, date)}
                howManyField={fieldsData.length}
                applyForAllFields={applyForAllFields.bind(this, date)}
              />
            </>
          );
        })}
      </View>
    </View>
  );
};

export default OrderContent;

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


function convertMinutesToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60); // Calculate the total hours
  const minutes = totalMinutes % 60; // Calculate the remaining minutes
  return { hours, minutes };
}