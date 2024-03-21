import React from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CustomModal = ({ children, animationType, visible, closeModal,style, debugOuter }) => {
  return (
    <>
      <OuterModal visible={visible} />
      <Modal transparent={true} animationType={animationType} visible={visible}>
        <Pressable
          onPress={closeModal}
          style={[styles.outerContainer,debugOuter && {backgroundColor:'red'}]}
        />
        <View style={[styles.container,style]}>{children}</View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    zIndex: -1,
    position: "relative",
  },
  container: {
    position: "absolute",
    width:'100%',
    height:'100%',
    zIndex: 1,
  },
});

export default CustomModal;

const OuterModal = ({ visible }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <StatusBar backgroundColor={"#00000075"} />
      <View
        style={{
          backgroundColor: "#00000075",
          flex: 1,
        }}
      />
    </Modal>
  );
};
