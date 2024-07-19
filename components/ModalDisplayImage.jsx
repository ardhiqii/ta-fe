import React, { useState } from "react";
import CustomModal from "./CustomModal";
import { Image, StyleSheet, View } from "react-native";

const ModalDisplayImage = ({ visible, closeModal, imageUrl }) => {
  return (
    <CustomModal visible={visible} closeModal={closeModal} style={styles.modal}>
      {/* <Image style={styles.image} src={imageUrl} /> */}
      <View style={[styles.imageContainer]}>
        <Image style={styles.image} src={imageUrl} />
      </View>
    </CustomModal>
  );
};

export default ModalDisplayImage;

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    borderColor: "#eceff1",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 500,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
