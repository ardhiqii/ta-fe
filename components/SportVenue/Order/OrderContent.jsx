import FieldOrder from "@components/SportVenue/Order/FieldOrder";
import TimeDisplay from "@components/SportVenue/TimeDisplay";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const OrderContent = ({
  date,
  fieldsData,
  updateFieldsData,
  nameVenue,
  applyForAllFields,
}) => {
  return (
    <View style={{ rowGap: 12 }}>
      <View
        style={{
          borderBottomWidth: 2,
          paddingVertical: 12,
          backgroundColor: COLOR.base500,
          borderColor: COLOR.base600,
          paddingHorizontal:25,
        }}
      >
        <Text style={{ fontFamily: LEXEND.Regular, fontSize: 16 }}>
          {nameVenue}
        </Text>
        <Text style={{ fontFamily: LEXEND.Light }}>Date: {date}</Text>
      </View>
      <View style={{ rowGap: 20 }}>
        {fieldsData.map((f, i) => {
          return (
            <>
              <FieldOrder
                key={i}
                {...f}
                updateFieldsData={updateFieldsData.bind(this, date)}
                howManyField={fieldsData.length}
                applyForAllFields={applyForAllFields.bind(this, date)}
              />
              <BorderLine
                key={"border" + i}
                customStyle={{ borderStyle: "dashed" }}
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
