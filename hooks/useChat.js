import { firestore } from "config/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "store/user-contex";

const useChat = () => {
  const [chats, setChats] = useState([]);

  const { user } = useContext(UserContext);
  const currUsername = user?.username;
  const chatsCollectionRef = collection(firestore, "chats");

  const getAllChats = async () => {
    try {
      const q = query(
        chatsCollectionRef,
        where("participants", "array-contains", currUsername)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setChats([]);
        return [];
      }
      const chatsArray = querySnapshot.docs.map((doc) => {
        return {
          chatId: doc.id,
          ...doc.data(),
        };
      });
      setChats(chatsArray);
      return chatsArray;
    } catch (error) {
      console.log(error);
    }
  };

  const createNewChatWithOtherUser = async (toUsername) => {
    try {
      const participants = [currUsername, toUsername];
      const newChatRef = await addDoc(chatsCollectionRef, {
        participants: participants,
      });

      return newChatRef.id;
    } catch (error) {
      console.log(error);
    }
  };

  const updateLatestMessage = async (chatId, message) => {
    try {
      const docRef = doc(firestore, "chats", chatId);
      const updateLatest = await updateDoc(docRef, {
        latestMessage: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMessagesByChatId = async (chatId) => {
    const messagesCollectionRef = collection(
      firestore,
      "chats",
      chatId,
      "messages"
    );
    const querySnapshot = await getDocs(messagesCollectionRef);
    if (querySnapshot.empty) {
      console.log("yes");
    }
    querySnapshot.docs.map((doc) => {
      console.log("exist");
      const data = doc.data();
      console.log(data);
      const date = data.createdAt.toDate().toDateString();
      console.log(date);
    });
  };

  const sendNewMessage = async (chatId, message) => {
    try {
      const messagesCollectionRef = collection(
        firestore,
        "chats",
        chatId,
        "messages"
      );

      const snapshot = await getDocs(messagesCollectionRef);

      const dataMessage = {
        text: message,
        sentBy: currUsername,
        createdAt: serverTimestamp(),
      };

      const newMessageRef = await addDoc(messagesCollectionRef, dataMessage);
      
      const latestMessage = {
        messageId: newMessageRef.id,
        ...dataMessage
      }

      updateLatestMessage(chatId,latestMessage)

      return newMessageRef.id;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllChats,
    chats,
    getMessagesByChatId,
    createNewChatWithOtherUser,
    sendNewMessage,
    updateLatestMessage,
    setChats
  };
};

export default useChat;
