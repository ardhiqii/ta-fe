import CustomModal from "@components/CustomModal";
import Input from "@components/Input";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { Player } from "util/player/player";
const InviteMemberModal = ({ visible, closeModal, token, idReservation,setForceRefresh }) => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inviteMemberHandler = async () => {
    try {
      const { data } = await Player.Booking.addMemberByUsername(
        token,
        idReservation,
        username
      );
      closeModal()
      setForceRefresh(true)
    } catch (e) {
      let error = e?.message;
      error = error?.split(" " + idReservation + " ")[0];
      setErrorMessage(error);
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
            Invite member
          </Text>
        </View>
        {/* ### Content ###*/}
        <View style={{ rowGap: 4 }}>
          <Text style={{ fontFamily: LEXEND.Light }}>Input username</Text>
          <Input onUpdateValue={setUsername} value={username} />
        </View>
        {errorMessage && (
          <Text style={{ fontFamily: LEXEND.Light, color: COLOR.accent1 }}>
            {errorMessage}
          </Text>
        )}
        {/* ### Confrimation Buttons ### */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            columnGap: 12,
          }}
        >
          <Pressable
            onPress={inviteMemberHandler}
            style={[styles.button, { backgroundColor: COLOR.base600 }]}
          >
            <Text style={{ fontFamily: LEXEND.Regular }}>Invite</Text>
          </Pressable>
          <Pressable
            onPress={closeModal}
            style={[styles.button, { backgroundColor: COLOR.accent1 }]}
          >
            <Text style={{ fontFamily: LEXEND.Regular }}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </CustomModal>
  );
};

export default InviteMemberModal;

const styles = StyleSheet.create({
  outerModal: {
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 300,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
    rowGap: 12,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
