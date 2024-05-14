import React, { useContext, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Field from "./Field";
import { Admin } from "util/admin/admin";
import { useRoute } from "@react-navigation/native";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import ModalAddBlacklistField from "./Blacklist/ModalAddBlacklistField";
import { TEMPORARY_ROLE } from "constant/DUMMY_ROLE";
import { Player } from "util/player/player";
import { UserContext } from "store/user-contex";

const ListFieldsContent = ({
  defaultData = [],
  category,
  time_open,
  time_closed,
  date,
  onChangeOrder,
  orderData = [],
  setForceRefresh
}) => {
  const [fieldsData, setFieldsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  const { user } = useContext(UserContext);
  const idVenue = route?.params?.idVenue;
  const editMode = route?.params?.editMode;

  useEffect(() => {
    setLoading(true);
    updateDataFromResponse();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    updateDataFromResponse();
    setLoading(false);
  }, [date]);

  const updateDataFromResponse = () => {
    setLoading(true);
    let current = orderData?.filter((o) => o.date === date)[0]?.fieldsData;

    const sorted = defaultData?.sort((a, b) => a.number - b.number);

    const temp = sorted.map((d) => {
      let value = [];
      if (current) {
        let temp = current.filter((c) => {
          return c.number === d.number;
        });
        if (temp[0]) {
          temp = temp[0].selected;
          value = temp;
        }
      }
      return { ...d, selected: value };
    });
    setFieldsData(temp);
    setLoading(false);
  };

  const handleSelectedFields = (id, value) => {
    let newFieldData = fieldsData.map((p) => {
      if (p.id === id) {
        return { ...p, selected: value };
      }
      return p;
    });

    setFieldsData(newFieldData);
    newFieldData = newFieldData.filter((p) => p.selected.length !== 0);
    onChangeOrder(date, newFieldData);
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
    const number =
      fieldsData.length > 0 ? fieldsData[fieldsData.length - 1].number + 1 : 1;
    try {
      const { data } = await Admin.SportVenue.addNewField(
        user.token,
        idVenue,
        number
      );
      if (data) {
        setForceRefresh(true)
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
      {editMode && (
        <View style={{}}>
          <View style={styles.addContainer}>
            <Pressable style={styles.addButton}>
              <Text onPress={alertAddNewField}>Add New Field</Text>
            </Pressable>
          </View>
        </View>
      )}
      {fieldsData?.map((field, i) => {
        return (
          <Field
            {...field}
            category={category}
            time_open={time_open}
            time_closed={time_closed}
            key={i}
            onChangeSelected={handleSelectedFields}
            updateDataFromResponse={updateDataFromResponse}
            date={date}
          />
        );
      })}
      {fieldsData?.length === 0 && (
        <Text
          style={{
            fontFamily: LEXEND.SemiBold,
            fontSize: 14,
            textAlign: "center",
            color: COLOR.border,
          }}
        >
          {editMode ? "Add your field by pressing Add New Field" : "Owner venue not adding the field"}
        </Text>
      )}
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
