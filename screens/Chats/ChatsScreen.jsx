import ItemChat from "@components/Chat/ItemChat";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "COLOR";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { ChatsContext } from "store/chats-context";
import { UserContext } from "store/user-contex";

const ChatsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const { chats } = useContext(ChatsContext);
  const currUsername = user?.username;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && (
        <Text
          style={{
            fontFamily: LEXEND.SemiBold,
            fontSize: 14,
            textAlign: "center",
            color: COLOR.border,
            marginTop: 20,
          }}
        >
          Loading
        </Text>
      )}
      {!isLoading && chats?.length === 0 && (
        <Text
          style={{
            fontFamily: LEXEND.SemiBold,
            fontSize: 14,
            textAlign: "center",
            color: COLOR.border,
            marginTop: 20,
          }}
        >
          There is no conversation made
        </Text>
      )}
      {chats?.map((c) => {
        const toUsername = c?.participants?.filter(
          (name) => name !== currUsername
        )[0];

        const unreadUsername = "unread_"+currUsername
        return (
          <ItemChat
            key={c.chatId + currUsername}
            chatId={c.chatId}
            toUsername={toUsername}
            latestMessage={c.latestMessage}
            unread={c[unreadUsername]}
          />
        );
      })}
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 20,
  },
});
