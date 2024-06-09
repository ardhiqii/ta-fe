import Filter from "@components/Search/Filter";
import React from "react";
import { StyleSheet, View } from "react-native";

const CATEGORY_FILTER = {
  label: "category",
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

const SORT_FILTER = {
  label: "sort",
  items: ["distance", "date"],
};

const MABAR_FILTER = {
  label: "mabar",
  items: ["all", "friendly", "competitive"],
};

const FiltersFindReservation = ({ filters, setFilters }) => {
  const updateFilter = (identifier, value) => {
    let newValue = value;
    if (identifier === "sortBy") {
      newValue = newValue === null ? "distance" : value;
    }
    setFilters((prev) => {
      return { ...prev, [identifier]: newValue };
    });
  };
  return (
    <View style={{ flexDirection: "row", columnGap: 14 }}>
      <Filter
        {...CATEGORY_FILTER}
        value={filters.category}
        onUpdate={updateFilter.bind(this, "category")}
      />
      <Filter
        {...MABAR_FILTER}
        value={filters.mabarType}
        onUpdate={updateFilter.bind(this, "mabarType")}
      />
      <Filter
        {...SORT_FILTER}
        value={filters.sortBy}
        onUpdate={updateFilter.bind(this, "sortBy")}
      />
    </View>
  );
};

export default FiltersFindReservation;

const styles = StyleSheet.create({
  container: {},
});
