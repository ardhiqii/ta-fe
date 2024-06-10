import React, { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "@components/Input";
import { COLOR } from "COLOR";
import useChat from "hooks/useChat";

const SendChat = ({ chatId, scrollToBottom }) => {
  const { sendNewMessage } = useChat();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    sendNewMessage(chatId, message);
    setMessage("");
  };
  return (
    <View style={styles.container}>
      <Input
        onFocus={scrollToBottom}
        value={message}
        onUpdateValue={setMessage}
        multiline={true}
        inputContainerStyle={styles.inputContaiener}
      />
      <Pressable style={{marginBottom:1}} onPress={handleSendMessage}>
        <Ionicons name="send" size={24} color={COLOR.base900} />
      </Pressable>
    </View>
  );
};

export default SendChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'flex-end',
    maxHeight: 200,
    backgroundColor: COLOR.base500,
    paddingHorizontal: 14,
    paddingVertical: 10,
    paddingBottom:20,
  },
  inputContaiener: {
    paddingVertical: 2,
  },
});
