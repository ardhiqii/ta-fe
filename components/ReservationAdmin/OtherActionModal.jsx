import CustomModal from "@components/CustomModal";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { Admin } from "util/admin/admin";
const OtherActionModal = ({
  token,
  idReservation,
  visible,
  closeModal,
  setForceRefresh,
}) => {
  const alertConfirmation = (status) => {
    Alert.alert("Confirmation", `Are you sure want to ${allCapital(status)}?`, [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: editStatusReservation.bind(this, status),
      },
    ]);
  };

  const editStatusReservation = async (status) => {
    try {
      const resp = await Admin.Booking.editStatusReservation(
        token,
        idReservation,
        status
      );
      if (resp.edit_status) {
        closeModal();
        setForceRefresh(true);
      }
    } catch (e) {
      console.log("Error occured editStatusReservation OtherActionModal", e);
    }
  };
  return (
    <CustomModal
      style={styles.outerModal}
      visible={visible}
      closeModal={closeModal}
    >
      <View style={styles.modalContainer}>
        {/* ### Navigation ###*/}
        <View style={styles.navContainer}>
          <Pressable onPress={closeModal}>
            <Ionicons name="close" size={30} />
          </Pressable>
          <Text style={{ fontFamily: LEXEND.SemiBold, fontSize: 20 }}>
            Others
          </Text>
        </View>
        {/* ### Content ###*/}
        <View style={{ rowGap: 8 }}>
          <Pressable
            onPress={alertConfirmation.bind(this, "waiting_approval")}
            style={styles.button}
          >
            <Text style={{ fontFamily: LEXEND.Regular, fontSize: 15 }}>
              Waiting Approval
            </Text>
          </Pressable>
          <BorderLine />
          <Pressable
            onPress={alertConfirmation.bind(this, "rejected")}
            style={styles.button}
          >
            <Text style={{ fontFamily: LEXEND.Regular, fontSize: 15 }}>
              Rejected
            </Text>
          </Pressable>
          <BorderLine />
          <Pressable
            onPress={alertConfirmation.bind(this, "cancelled")}
            style={styles.button}
          >
            <Text style={{ fontFamily: LEXEND.Regular, fontSize: 15 }}>
              Cancelled
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomModal>
  );
};

export default OtherActionModal;

const styles = StyleSheet.create({
  outerModal: {
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 5,
    paddingVertical: 10,
    rowGap: 12,
    paddingBottom: 14,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    paddingHorizontal: 25,
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
  },
});

const BorderLine = ({ customStyle }) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderColor: "#eceff1",
        },
        customStyle,
      ]}
    />
  );
};

const allCapital = (status) => {
  let displayStatus = status.toLowerCase().split("_");
  for (let [i, s] of displayStatus.entries()) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    displayStatus[i] = s;
  }
  displayStatus = displayStatus.join(" ");
  return displayStatus;
};
