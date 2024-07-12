import React from "react";
import CustomModal from "./CustomModal";
import { Image, StyleSheet, View } from "react-native";

const ModalDisplayImage = ({ visible, closeModal, imageUrl }) => {
  return (
    <CustomModal
      visible={visible}
      closeModal={closeModal}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      {/* <Image style={styles.image} src={imageUrl} /> */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} src={imageUrl} />
      </View>
    </CustomModal>
  );
};

export default ModalDisplayImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderColor: "#eceff1",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 250,
    height: 520,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
