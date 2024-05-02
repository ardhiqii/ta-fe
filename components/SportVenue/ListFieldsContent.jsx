import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Field from "./Field";
import { Admin } from "util/admin/admin";
import { useRoute } from "@react-navigation/native";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import ModalAddBlacklistField from "./Blacklist/ModalAddBlacklistField";

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

const ListFieldsContent = ({
  data = [],
  category,
  time_open,
  time_closed,
  date,
  onChangeOrder,
}) => {
  const [fieldsData, setFieldsData] = useState(data);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const idVenue = route?.params?.idVenue;
  const editMode = route?.params?.editMode;

  const updateDataFromResponse = (data) => {
    setLoading(true);
    const temp = data.map((d) => {
      return { ...d, selected: [] };
    });
    const sorted = temp.sort((a, b) => a.number - b.number);
    setFieldsData(sorted);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    updateDataFromResponse(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      // console.log("CALLED");
      // onChangeOrder(date, fieldsData);
      // console.log(fieldsData);
    }
  }, [fieldsData]);

  const handleSelectedFields = (id, value) => {
    setFieldsData((prev) =>
      prev.map((field) => {
        if (field.id === id) {
          return { ...field, selected: value };
        }
        return field;
      })
    );
    // onChangeOrder(date, fieldsData);
  };

  const alertAddNewField = () => {
    Alert.alert("Confirmation", "Are you really want to add new field?", [
      {
        text: "Ok",
        onPress: addNewFieldHandler,
      },
      {
        text: "Cancel",
      },
    ]);
  };

  const addNewFieldHandler = async () => {
    const token =
      "fOf042XZqrW*MPcz4/0yBa9jce9ySHlHSn.Fa8++HS+kBFDMbEViaEl2doRd-Wb=+5fVp3EEmA1G/Cr/5T4)5u4k614aBM1DW1e6m0MTDaw1hl<N)MZm82o-V0tYU17s";
    const number =
      fieldsData.length > 0 ? fieldsData[fieldsData.length - 1].number + 1 : 1;
    try {
      const { data } = await Admin.SportVenue.addNewField(
        TOKEN_TEMPORARY,
        idVenue,
        number
      );
      if (data) {
        updateDataFromResponse(data);
      }
    } catch (e) {
      console.log("Error occured addNewFieldHandler, ListFieldsContent", e);
      console.log(e.response.data);
    }
  };

  if (loading)
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={{}}>
        <View style={styles.addContainer}>
          <Pressable style={styles.addButton}>
            <Text onPress={alertAddNewField}>Add New Field</Text>
          </Pressable>
        </View>
      </View>
      {fieldsData.map((field, i) => {
        return (
          <Field
            {...field}
            category={category}
            time_open={time_open}
            time_closed={time_closed}
            key={i}
            onChangeSelected={handleSelectedFields}
            updateDataFromResponse={updateDataFromResponse}
          />
        );
      })}
      {fieldsData.length === 0 && <Text style={{fontFamily:LEXEND.SemiBold,fontSize:14,textAlign:'center',color:COLOR.border}}>Add your field by pressing Add New Field</Text>}
    </View>
  );
};

export default ListFieldsContent;

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
  addContainer: {
    paddingHorizontal: 25,
    flexDirection: "row",
    marginTop: 10,
  },
  addButton: {
    borderWidth: 2,
    paddingHorizontal: 5,
  },
});

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
