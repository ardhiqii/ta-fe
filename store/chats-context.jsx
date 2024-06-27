import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  addDoc,
  doc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { UserContext } from "./user-contex";
import { firestore } from "config/firebaseConfig";

export const ChatsContext = createContext({
  chats: [],
  allUnreads: 0,
  createNewChatWithOtherUser: () => {},
  sendNewMessage: () => {},
  getMessagesByChatId: () => {},
  updateLatestMessage: () => {},
  upadateUnreadtoRead: () => {},
  getAllUnReadMessages: () => {},
});

const ChatsContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [allUnreads, setAllUnreads] = useState(0);
  const { user } = useContext(UserContext);
  const chatsCollectionRef = collection(firestore, "chats");
  const currUsername = user?.username;

  useEffect(() => {
    if (!currUsername) return;
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
      getAllUnReadMessages(updatedChats);
      setChats(updatedChats);
    });

    return () => {
      unsubscribe();
    };
  }, [user?.username]);

  const createNewChatWithOtherUser = async (toUsername) => {
    try {
      const q1 = query(
        chatsCollectionRef,
        where("participants", "==", [currUsername, toUsername])
      );
      const q2 = query(
        chatsCollectionRef,
        where("participants", "==", [toUsername, currUsername])
      );

      const [querySnapshot1, querySnapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);

      if (!querySnapshot1.empty) {
        const chatId = querySnapshot1.docs.map((doc) => {
          return doc.id;
        })[0];
        return chatId;
      }
      if (!querySnapshot2.empty) {
        const chatId = querySnapshot2.docs.map((doc) => {
          return doc.id;
        })[0];
        return chatId;
      }

      const participants = [currUsername, toUsername];
      const newChatRef = await addDoc(chatsCollectionRef, {
        participants: participants,
      });

      return newChatRef.id;
    } catch (error) {
      console.log(error);
    }
  };

  const updateLatestMessage = async (chatId, message, toUsername) => {
    try {
      const unreadUsername = "unread_" + toUsername;
      const docRef = doc(firestore, "chats", chatId);
      const updateUnread = await updateDoc(docRef, {
        [unreadUsername]: arrayUnion(message.text),
      });
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

  const sendNewMessage = async (chatId, message, toUsername) => {
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
        ...dataMessage,
      };

      updateLatestMessage(chatId, latestMessage, toUsername);

      return newMessageRef.id;
    } catch (error) {
      console.log(error);
    }
  };

  const upadateUnreadtoRead = async (chatId) => {
    const unreadUsername = "unread_" + currUsername;
    const docRef = doc(firestore, "chats", chatId);
    try {
      const updateRead = await updateDoc(docRef, {
        [unreadUsername]: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUnReadMessages = async (updatedChats) => {
    if (!updatedChats) return;
    let unreads = 0;
    try {
      updatedChats.map((c) => {
        const unread = `unread_` + currUsername;
        unreads += c[unread].length;
      });
      setAllUnreads(unreads);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    chats: chats,
    allUnreads: allUnreads,
    getMessagesByChatId,
    createNewChatWithOtherUser,
    sendNewMessage,
    updateLatestMessage,
    upadateUnreadtoRead,
    getAllUnReadMessages,
  };
  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
};

export default ChatsContextProvider;
