import ItemChat from "@components/Chat/ItemChat";
import Button from "@components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "config/firebaseConfig";
import {
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
    setChats
  } = useChat();
  const [messages, setMessages] = useState([]);
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const currUsername = user?.username;

  useEffect(() => {
    getAllChats(); 
  }, []);
  useEffect(() => {
    const chatsCollectionRef = collection(firestore, "chats");
    const q = query(
      chatsCollectionRef,
      where("participants", "array-contains", currUsername)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedChats = snapshot.docs.map((doc) => ({
        chatId: doc.id,
        ...doc.data(),
      }));
      setChats(updatedChats)
    });

    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <ScrollView contentContainerStyle={styles.container}>
      {chats?.map((c) => {
        const toUsername = c?.participants?.filter(
          (name) => name !== currUsername
        )[0];
        return (
          <ItemChat key={c.chatId+currUsername} chatId={c.chatId} toUsername={toUsername} latestMessage={c.latestMessage} />
        );
      })}
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  
  },
});
