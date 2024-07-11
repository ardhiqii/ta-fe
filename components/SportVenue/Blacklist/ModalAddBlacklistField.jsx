import Input from "@components/Input";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Fontisto } from "@expo/vector-icons";
import { Admin } from "util/admin/admin";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import LoadingOverlay from "@components/LoadingOverlay";
import { UserContext } from "store/user-contex";

const currDate = new Date();
const nextDate = new Date();
nextDate.setHours(23, 59, 59, 999);

const defaultData = {
  reason: "",
  date: currDate,
  from: currDate,
  to: nextDate,
  isEveryWeek: false,
  modal_date: false,
  modal_from: false,
  modal_to: false,
  init_from: true,
  init_to: true,
};

const ModalAddBlacklistField = ({
  visible,
  setVisible,
  idField,
  setIsAdded,
}) => {
  const [schedule, setSchedule] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const onChangeHandler = (identifier, value) => {
    setSchedule((prev) => {
      return { ...prev, [identifier]: value };
    });
  };

  const onChangeTime = (identifier, event, value) => {
    const changeModal = "modal_" + identifier;
    const changeInit = "init_" + identifier;
    onChangeHandler(changeModal, false);
    if (event.type === "set") {
      onChangeHandler(identifier, value);
      onChangeHandler(changeInit, false);
    }
  };

  const convertDate = (date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();

    month = month.length < 2 ? "0" + month : month;
    day = day.length < 2 ? "0" + day : day;
    const result = `${year}-${month}-${day}`;
    return result;
  };

  const convertTime = (date) => {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    hours = hours.length < 2 ? "0" + hours : hours;
    minutes = minutes.length < 2 ? "0" + minutes : minutes;
    const result = `${hours}:${minutes}`;
    return result;
  };

  const aletConfirmation = () => {
    Alert.alert("Confirmation", "Are you sure you have set correctly?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: doneHandler,
      },
    ]);
  };

  const doneHandler = async () => {
    const fromTime = convertTime(schedule.from) + ":00";
    const toTime = convertTime(schedule.to) + ":00";
    const date = convertDate(schedule.date);
    const dataBlacklist = {
      Field_id: idField,
      date: date,
      fromTime: fromTime,
      toTime: toTime,
      is_every_week: schedule.isEveryWeek,
      reason: schedule.reason,
    };
    console.log(dataBlacklist);

    try {
      setLoading(true);
      const resp = await Admin.SportVenue.addBlacklistScheduleByFieldId(
        user.token,
        dataBlacklist
      );
      console.log(resp);
      setSchedule({
        reason: "",
        date: new Date(),
        from: new Date(),
        to: new Date(),
        isEveryWeek: false,
        modal_date: false,
        modal_from: false,
        modal_to: false,
        init_from: true,
        init_to: true,
      });
      setLoading(false);
      setIsAdded(true);
      setVisible(false);
    } catch (e) {
      console.log("Error occured doneHandler, ModelAddBlacklistField", e);
    }
  };

  return (
    <Modal visible={visible}>
      {loading && <LoadingOverlay />}
      <View style={styles.header}>
        <Pressable
          onPress={() => setVisible(false)}
          style={{ justifyContent: "center" }}
        >
          <Fontisto name="close-a" size={20} />
        </Pressable>

        <Text style={{ fontFamily: LEXEND.Bold, fontSize: 20 }}>
          Blacklist Schedule
        </Text>
      </View>
      <View style={{ rowGap: 14, marginTop: 20 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Reason: </Text>
          <Input
            onUpdateValue={onChangeHandler.bind(this, "reason")}
            value={schedule.reason}
          />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Date: </Text>
          <Pressable
            onPress={() => onChangeHandler("modal_date", true)}
            style={[styles.dateButton]}
          >
            <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>
              {convertDate(schedule.date)}
            </Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>From: </Text>
            <Pressable
              onPress={() => onChangeHandler("modal_from", true)}
              style={styles.dateButton}
            >
              <Text
                style={[
                  { fontFamily: LEXEND.Light, fontSize: 12 },
                  schedule.init_from && { color: COLOR.second900 },
                ]}
              >
                {convertTime(schedule.from)}
              </Text>
            </Pressable>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.label}>To: </Text>
            <Pressable
              onPress={() => onChangeHandler("modal_to", true)}
              style={styles.dateButton}
            >
              <Text
                style={[
                  { fontFamily: LEXEND.Light, fontSize: 12 },
                  schedule.init_to && { color: COLOR.second900 },
                ]}
              >
                {convertTime(schedule.to)}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={[styles.dateContainer]}>
          <Pressable
            onPress={() =>
              onChangeHandler("isEveryWeek", !schedule.isEveryWeek)
            }
            style={{
              flexDirection: "row",
              columnGap: 12,
              alignItems: "center",
            }}
          >
            <Text style={styles.label}>Every Week</Text>
            <View style={styles.checkBox}>
              <View
                style={[
                  {
                    width: "100%",
                    height: "100%",
                  },
                  schedule.isEveryWeek && { backgroundColor: "#67f66b" },
                ]}
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.buttons}>
          <Pressable
            onPress={() => setVisible(false)}
            style={[styles.confirm, { backgroundColor: COLOR.accent1 }]}
          >
            <Text style={{ fontFamily: LEXEND.Bold }}>Cancel</Text>
          </Pressable>
          <Pressable
            onPress={aletConfirmation}
            style={[styles.confirm, { backgroundColor: "#67f66b" }]}
          >
            <Text style={{ fontFamily: LEXEND.Bold }}>Done</Text>
          </Pressable>
        </View>
      </View>
      <View>
        {schedule.modal_date && (
          <DateTimePicker
            value={schedule.date}
            mode="date"
            onChange={onChangeTime.bind(this, "date")}
          />
        )}

        {schedule.modal_from && (
          <DateTimePicker
            value={schedule.from}
            mode="time"
            is24Hour={true}
            onChange={onChangeTime.bind(this, "from")}
          />
        )}

        {schedule.modal_to && (
          <DateTimePicker
            value={schedule.to}
            mode="time"
            is24Hour={true}
            onChange={onChangeTime.bind(this, "to")}
          />
        )}
      </View>
    </Modal>
  );
};

export default ModalAddBlacklistField;

const styles = StyleSheet.create({
  container: {},

  header: {
    marginTop: 40,
    paddingHorizontal: 25,
    marginBottom: 10,
    flexDirection: "row",
    alignContent: "center",
    columnGap: 20,
  },

  inputContainer: {
    paddingHorizontal: 25,
    rowGap: 8,
  },
  label: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
  },
  dateContainer: {
    paddingHorizontal: 25,
    columnGap: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  dateButton: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLOR.border,
    borderRadius: 5,
  },
  checkBox: {
    borderWidth: 1,
    width: 15,
    height: 15,
    padding: 2,
  },

  buttons: {
    paddingHorizontal: 25,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 15,
  },

  confirm: {
    borderWidth: 1,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
});
