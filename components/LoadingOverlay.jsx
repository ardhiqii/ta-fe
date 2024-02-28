import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"}/>
    </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000008d",
    zIndex: 90,
  },
});
