import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Admin } from "util/admin/admin";

import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import { useNavigation, useRoute } from "@react-navigation/native";
import ModalAddBlacklistField from "@components/SportVenue/Blacklist/ModalAddBlacklistField";
import { UserContext } from "store/user-contex";

const TEMP_DATA = [
  {
    blacklist_id: "bb658096-d5d8-46fb-b823-00513c412111",
    date: "2024-04-05",
    fromTime: "8:00:00",
    reason: "Jadwal Sholat Jumat",
    toTime: "13:00:00",
  },
];

const ManageBlacklistSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [blacklistData, setBlacklistData] = useState([]);
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth() + 1);
  const [visibileModal, setVisibleModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { user } = useContext(UserContext);

  const nav = useNavigation();
  const route = useRoute();
  const idField = route?.params?.idField;
  const number = route?.params?.number;

  useLayoutEffect(() => {
    nav.setOptions({
      headerTitle: "Field " + number,
    });
  }, [nav]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await Admin.SportVenue.getBlacklistFieldById(
        user.token,
        idField,
        monthNumber,
        new Date().getFullYear()
      );
      if (data) {
        setBlacklistData(data);
      } else {
        setBlacklistData([]);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setIsAdded(false);
    fetchData();
  }, [isAdded]);

  const changeMonthNumberHandler = (value) => {
    const number = Number(value);
    setMonthNumber(number);
  };

  const onSubmitMontNumber = async () => {
    if (monthNumber < 1 || monthNumber > 12) return;
    fetchData();
  };

  const deleteBlacklistHandler = async (idBlacklist) => {
    try {
      const { data } = await Admin.SportVenue.deleteBlacklistScheduleByFieldId(
        user.token,
        idBlacklist
      );

      if (data) {
        console.log(data);

        fetchData();
      }
    } catch (e) {
      console.log("Error occured in deleteBlacklistHandler", e);
    }
  };
  return (
    <ScrollView contentContainerStyle={stlyes.container}>
      <View style={stlyes.header}>
        <Text style={{ fontFamily: LEXEND.Bold }}>List blacklist</Text>
        <Pressable
          onPress={() => setVisibleModal(true)}
          style={stlyes.addButton}
        >
          <Text style={{ fontFamily: LEXEND.Regular, fontSize: 12 }}>
            Add Blacklist
          </Text>
        </Pressable>
      </View>

      <View style={stlyes.sortContainer}>
        <View style={stlyes.sort}>
          <Text style={{ fontFamily: LEXEND.Regular }}>Month: </Text>
          <View style={stlyes.monthInput}>
            <TextInput
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: LEXEND.Regular,
              }}
              keyboardType="number-pad"
              value={monthNumber.toString()}
              onChangeText={changeMonthNumberHandler}
              onSubmitEditing={onSubmitMontNumber}
            />
          </View>
        </View>
      </View>

      <View style={{ rowGap: 15 }}>
        {loading && (
          <View>
            <Text>Loading</Text>
          </View>
        )}
        {blacklistData?.length === 0 && !loading && (
          <Text
            style={{
              fontFamily: LEXEND.SemiBold,
              fontSize: 14,
              textAlign: "center",
              color: COLOR.border,
            }}
          >
            There is no blacklist schedule
          </Text>
        )}
        {blacklistData?.map((bl) => (
          <CardBlacklist
            key={bl.date + bl.blacklist_id}
            {...bl}
            onDelete={deleteBlacklistHandler}
          />
        ))}
      </View>

      <ModalAddBlacklistField
        visible={visibileModal}
        setVisible={setVisibleModal}
        idField={idField}
        setIsAdded={setIsAdded}
      />
    </ScrollView>
  );
};

export default ManageBlacklistSchedule;

const stlyes = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 20,
    paddingBottom: 60,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },

  addButton: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sortContainer: {
    marginBottom: 15,
  },
  sort: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthInput: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: COLOR.border,
    width: 40,
    alignItems: "center",
  },
});

const CardBlacklist = ({
  blacklist_id,
  date,
  fromTime,
  reason,
  toTime,
  onDelete,
}) => {
  const alertDeleteBlacklist = () => {
    Alert.alert("Confirmation", "Are you sure want to delete?", [
      {
        text: "Yes",
        onPress: () => onDelete(blacklist_id),
      },
      {
        text: "Cancel",
      },
    ]);
  };
  return (
    <View style={stylesCard.blContainer}>
      <View style={{ rowGap: 4 }}>
        <Text style={{ fontFamily: LEXEND.Regular }}>{date}</Text>
        <Text style={stylesCard.text}>{reason}</Text>
        <Text style={stylesCard.text}>
          Time: {fromTime.slice(0, -3)} - {toTime.slice(0, -3)}
        </Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Pressable onPress={alertDeleteBlacklist}>
          <Feather name="trash-2" size={20} color={"red"} />
        </Pressable>
      </View>
    </View>
  );
};

const stylesCard = {
  blContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: COLOR.second700,
    borderRadius: 5,
  },

  text: { fontFamily: LEXEND.Regular, fontSize: 12, color: COLOR.second700 },
};
