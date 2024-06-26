import { COLOR } from "COLOR";
import React from "react";
import { StyleSheet, View } from "react-native";

const BottomActionLayout = ({ children,style }) => {
  return <View style={[styles.container,style]}>
    {children}
  </View>;
};

export default BottomActionLayout;

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
