import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Currency } from "util/currency";
import OtherActionModal from "./OtherActionModal";
import { Admin } from "util/admin/admin";

const BottomActionAdmin = ({
  bookingStatus,
  totalPrice,
  token,
  idReservation,
  setForceRefresh,
}) => {
  const [visible, setVisible] = useState(false);
  const displayStatus = allCapital(bookingStatus);

  const alertConfirmation = () => {
    Alert.alert("Confirmation", `Are you sure want to Approved?`, [
      {
        text: "Yes",
        onPress: approvedStatusReservation,
      },
      {
        text: "No",
      },
    ]);
  };

  const approvedStatusReservation = async () => {
    try {
      const resp = await Admin.Booking.editStatusReservation(
        token,
        idReservation,
        "approved"
      );
      if (resp.edit_status) {
        setForceRefresh(true);
      }
    } catch (e) {
      console.log(
        "Error occured approvedStatusReservation BottomActionAdmin",
        e
      );
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: LEXEND.Regular }}>
            Status:{" "}
            <Text style={{ fontFamily: LEXEND.Bold }}>{displayStatus}</Text>
          </Text>

          <Text style={{ fontFamily: LEXEND.Bold }}>
            Rp.{Currency.format(totalPrice)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", columnGap: 12 }}>
          <View style={{ flex: 1 }}>
            <Button onPress={alertConfirmation}>Approved</Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => setVisible(true)}
              customStyle={{ backgroundColor: COLOR.accent2 }}
            >
              Others
            </Button>
          </View>
        </View>
      </View>
      <OtherActionModal
        token={token}
        idReservation={idReservation}
        visible={visible}
        closeModal={() => setVisible(false)}
        setForceRefresh={setForceRefresh}
      />
    </>
  );
};

export default BottomActionAdmin;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderColor: COLOR.border,
    paddingHorizontal: 25,
    paddingTop: 10,
    rowGap: 8,
    paddingBottom: 25,
  },
});

const allCapital = (status) => {
  let displayStatus = status.toLowerCase().split("_");
  for (let [i, s] of displayStatus.entries()) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    displayStatus[i] = s;
  }
  displayStatus = displayStatus.join(" ");
  return displayStatus;
};
