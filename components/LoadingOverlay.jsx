import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CustomModal from "./CustomModal";

const LoadingOverlay = () => {
  return (
    <CustomModal style={{justifyContent:'center'}}>
        <ActivityIndicator size={"large"} />
    </CustomModal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0000008d",
    zIndex: 90,
  },
});
