import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ChatBubble = ({ children, isOwnMessage,bubbleColor,style }) => {
  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownBubble : styles.oppositeBubble, {backgroundColor:bubbleColor}
      ]}
    >
      {children}
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  container: {
    maxWidth: 260,
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius:8,
    marginVertical:4
  },
  ownBubble: {
    alignSelf: "flex-end",
  },
  oppositeBubble: {
    alignSelf: "flex-start",
  },
});
