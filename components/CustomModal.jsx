import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CustomModal = ({
  children,
  animationType,
  visible,
  closeModal,
  style,
  debugOuter,
}) => {
  

  return (
    <>
      <OuterModal visible={visible} />
      <Modal
        transparent={true}
        animationType={animationType}
        visible={visible}
        onRequestClose={() => closeModal()}
      >
        <Pressable
          onPress={closeModal}
          style={[
            styles.outerContainer,
            style,
            debugOuter && { backgroundColor: "red" },
          ]}
        >
          <Pressable>{children}</Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    zIndex: 1,
  },
  container: {},
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
