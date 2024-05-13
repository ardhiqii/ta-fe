import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Filter from "./Filter";
import { CATEGORY_ID } from "constant/CATEGORY_ID";
import { useRoute } from "@react-navigation/native";

const CATEGORY_FILTER = {
  label: "Category",
  items: [
    "futsal",
    "basket",
    "badminton",
    "volley",
    "swimming",
    "bowling",
    "tennis",
  ],
};
const PARKING_FILTER = {
  label: "Parking",
  items: ["Car", "Bike"],
};
const Filters = ({ updateFilter }) => {
  const route = useRoute();

  const categoryValue = route?.params?.filters?.category;

  const updateCategory = (value) => {
    let cat = value !== null ? CATEGORY_ID[value] : value;
    updateFilter("Sport_Kind_id", cat);
  };

  const updatePark = (value) => {
    if (value === null) {
      updateFilter("is_bike_parking", null);
      updateFilter("is_car_parking", null);
    } else {
      const identifier = `is_${value}_parking`;
      updateFilter(identifier, true);
      if (value === "car") {
        updateFilter("is_bike_parking", false);
      } else {
        updateFilter("is_car_parking", false);
      }
    }
  };
  return (
    <View
      style={{ flexDirection: "row", paddingHorizontal: 25, columnGap: 10 }}
    >
      <Filter
        key={0}
        {...CATEGORY_FILTER}
        onUpdate={updateCategory}
        value={categoryValue}
      />
      <Filter key={1} {...PARKING_FILTER} onUpdate={updatePark} />
    </View>
  );
};

export default Filters;
