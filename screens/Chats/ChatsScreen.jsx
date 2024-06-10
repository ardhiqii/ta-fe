import ItemChat from "@components/Chat/ItemChat";
import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "COLOR";
import { firestore } from "config/firebaseConfig";
import {
  and,
  collection,
  collectionGroup,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import useChat from "hooks/useChat";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";

const ChatsScreen = () => {
  const {
    getAllChats,
    chats,
    createNewChatWithOtherUser,
    updateLatestMessage,
    setChats,
  } = useChat();
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const currUsername = user?.username;

  const initData = async () => {
    try {
      setIsLoading(true);
      await getAllChats();
    } catch (error) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initData();
  }, []);
  useEffect(() => {
    const chatsCollectionRef = collection(firestore, "chats");
    const q = query(
      chatsCollectionRef,
      where("participants", "array-contains", currUsername),
      where("latestMessage", "!=", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedChats = snapshot.docs.map((doc) => ({
        chatId: doc.id,
        ...doc.data(),
      }));
      setChats(updatedChats);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
        return (
          <ItemChat
            key={c.chatId + currUsername}
            chatId={c.chatId}
            toUsername={toUsername}
            latestMessage={c.latestMessage}
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
    rowGap:20,
  },
});
