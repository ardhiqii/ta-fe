import ModalDisplayImage from "@components/ModalDisplayImage";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const PaymentContent = ({ payment_credential_url }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={{ rowGap: 20 }}>
        <View style={{ paddingHorizontal: 25 }}>
          <Text style={{ fontFamily: LEXEND.SemiBold, color: COLOR.base900 }}>
            Payment credential
          </Text>
        </View>
        {!payment_credential_url && (
          <Text
            style={{
              fontFamily: LEXEND.SemiBold,
              fontSize: 14,
              textAlign: "center",
              color: COLOR.border,
            }}
          >
            Host still not send payment credential
          </Text>
        )}
        {payment_credential_url && (
          <Pressable
            onPress={() => setVisible(true)}
            style={styles.imageContainer}
          >
            <Image
              source={{
                uri: payment_credential_url,
              }}
              style={styles.image}
            />
          </Pressable>
        )}
      </View>
      {payment_credential_url && (
        <ModalDisplayImage
          visible={visible}
          closeModal={() => setVisible(false)}
          imageUrl={payment_credential_url}
        />
      )}
    </>
  );
};

export default PaymentContent;

const styles = StyleSheet.create({
  imageContainer: {
    borderColor: "#eceff1",
    alignItems: "center",
    justifyContent: "center",
    height: 216,
    paddingHorizontal: 25,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold, fontSize: 12 },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
  },
});
