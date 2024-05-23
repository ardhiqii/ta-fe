import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Currency } from "util/currency";
import * as ImagePicker from "expo-image-picker";
import { Player } from "util/player/player";
import { useNavigation } from "@react-navigation/native";
import DisplayQRModal from "./DisplayQRModal";

const BottomAction = ({
  bookingStatus,
  totalPrice,
  roleReviewer,
  token,
  idReservation,
  registered,
  setForceRefresh,
}) => {
  const [visible, setVisible] = useState(false);

  const isReviewerHost = roleReviewer == "host";
  const displayStatus = allCapital(bookingStatus);
  const cancelAble = checkCancelAble(bookingStatus, isReviewerHost);
  const joinAble = !registered && !isReviewerHost;
  const nav = useNavigation();

  const uploadImage = async () => {
    const image = await pickImage();
    if (!image) return;

    const formData = new FormData();
    const uri = image;
    const fileType = uri.split(".").pop();

    // Convert the image to a binary string (base64)
    const response = await fetch(uri);
    const blob = await response.blob();
    const base64Data = await blobToBase64(blob);

    formData.append("file", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("binary", base64Data);

    try {
      const resp = await Player.Booking.uploadPayment(
        token,
        idReservation,
        formData
      );
      console.log(resp);
    } catch (e) {
      console.log("Error occured in upload image", e);
    }
  };

  const cancelReservation = async () => {
    try {
      const resp = await Player.Booking.cancelReservation(token, idReservation);
      console.log(resp);
    } catch (e) {
      console.log("error occured cancelReservation BottomAction", e);
    }
  };

  const leaveReservationHandler = async () => {
    try {
      const resp = await Player.Booking.leaveReservation(token, idReservation);
      if (resp.leave_status) {
        nav.goBack();
      }
    } catch (e) {
      console.log("error occured leaveReservationHandler", e);
    }
  };

  const alertLeaveReservation = () => {
    Alert.alert("Confirmation", "Are you sure you want to leave?", [
      {
        text: "Yes",
        onPress: leaveReservationHandler,
      },
      {
        text: "No",
      },
    ]);
  };

  const joinHandler = async () => {
    try {
      const resp = await Player.Booking.joinReservation(token, idReservation);
      if (resp.join_status) {
        setForceRefresh(true);
      }
    } catch (e) {
      console.log("error occured leaveReservationHandler", e);
    }
  };

  return (
    <>
      <View style={[styles.container]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: LEXEND.Regular }}>
            Status:{" "}
            <Text style={{ fontFamily: LEXEND.Bold }}>{displayStatus}</Text>
          </Text>
          {isReviewerHost && (
            <Text style={{ fontFamily: LEXEND.Bold }}>
              Rp.{Currency.format(totalPrice)}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", columnGap: 12 }}>
          {cancelAble && (
            <View style={{ flex: 1 }}>
              <Button onPress={uploadImage}>Upload</Button>
            </View>
          )}
          {bookingStatus === "approved" && (
            <View style={{ flex: 1 }}>
              <Button onPress={() => setVisible(true)}>Show QR</Button>
            </View>
          )}
          {cancelAble && (
            <View style={{ flex: 1 }}>
              <Button
                onPress={cancelReservation}
                customStyle={{ backgroundColor: COLOR.accent1 }}
              >
                Cancel
              </Button>
            </View>
          )}
          {!isReviewerHost && !joinAble && (
            <View style={{ flex: 1 }}>
              <Button
                onPress={alertLeaveReservation}
                customStyle={{ backgroundColor: COLOR.accent1 }}
              >
                Leave
              </Button>
            </View>
          )}
          {joinAble && (
            <View style={{ flex: 1 }}>
              <Button onPress={joinHandler}>Join</Button>
            </View>
          )}
        </View>
      </View>
      {bookingStatus === "approved" && <DisplayQRModal visible={visible} closeModal={() => setVisible(false)} token={token} idReservation={idReservation} />}
    </>
  );
};

export default BottomAction;

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

const checkCancelAble = (status, role) => {
  const tempStatus = ["payment", "waiting_approval"];
  return tempStatus.includes(status) && role;
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true, // Set to true if you want to allow image editing
    quality: 1,
  });

  if (!result.canceled && result.assets.length === 1) {
    return result.assets[0].uri;
  } else {
    return null;
  }
};
