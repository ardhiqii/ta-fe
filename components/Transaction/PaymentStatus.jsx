import ModalDisplayImage from "@components/ModalDisplayImage";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const PaymentStatus = ({ imageUrl, roleReviewer }) => {
  const [visible, setVisible] = useState(false);
  const isHost = roleReviewer === "host";
  if (!isHost) {
    return;
  }
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.subText}>Payment</Text>
          <Text style={styles.text}>
            Payment status is{" "}
            <Text style={{ fontFamily: LEXEND.Bold, color: "black" }}>
              {imageUrl ? "sent" : "not sent yet"}
            </Text>
          </Text>
        </View>
        {imageUrl && (
          <Pressable
            onPress={() => setVisible(true)}
            style={({ pressed }) => [
              styles.button,
              pressed && { opacity: 0.7, backgroundColor: "#7676764e" },
            ]}
          >
            <Text
              style={{
                fontFamily: LEXEND.Light,
                fontSize: 10,
                color: COLOR.base900,
              }}
            >
              Show
            </Text>
          </Pressable>
        )}
        {/* <Image src={imageUrl} style={{width:100,height:100}}/> */}
      </View>
      {imageUrl && (
        <ModalDisplayImage
          visible={visible}
          closeModal={() => setVisible(false)}
          imageUrl={imageUrl}
        />
      )}
    </>
  );
};

export default PaymentStatus;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold, fontSize: 12 },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    width: 80,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.base900,
  },
});
