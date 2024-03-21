import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Field from "./Field";

const FIELDS_DATA = [
  {
    id: "1",
    name: "Field",
    category: "basket",
    price: "Rp 100.000",
    selected: [],
  },
  {
    id: "2",
    name: "Field",
    category: "badminton",
    price: "Rp 120.000",
    selected: [],
  },
];

const ListFieldsContent = () => {
  const [fieldsData, setFieldsData] = useState(FIELDS_DATA);

  const handleSelectedFields = (id, value) => {
    setFieldsData((prev) =>
      prev.map((field) => {
        if (field.id === id) {
          return { ...field, selected: value };
        }
        return field;
      })
    );
  };
  if (!fieldsData)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {fieldsData.map((field, i) => {
   
        return (
          <Field {...field} key={i} onChangeSelected={handleSelectedFields} />
        )
      })}
    </View>
  );
};

export default ListFieldsContent;

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
});
