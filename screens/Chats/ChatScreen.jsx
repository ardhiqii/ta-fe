import SendChat from "@components/Chat/SendChat";
import Input from "@components/Input";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOR } from "COLOR";
import { firestore } from "config/firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import moment from "moment";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ChatsContext } from "store/chats-context";
import ChatBubble from "@components/Chat/ChatBubble";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [toUsernameData, setToUsernameData]=useState(route?.params?.toUserData)
  const { upadateUnreadtoRead } = useContext(ChatsContext);
  const { user } = useContext(UserContext);
  const route = useRoute();
  const nav = useNavigation();
  const chatId = route?.params?.chatId;
  const toUsername = route?.params?.toUsername;
  const chatDate = [];

  const scrollViewRef = useRef(null);

  useLayoutEffect(() => {
    nav.setOptions({
      title: toUsernameData?.name,
    });
  }, [toUsernameData]);


  useEffect(()=>{
    setToUsernameData(route?.params?.toUserData)
  },[route?.params?.toUserData])

  useEffect(() => {
    const messagesCollectionRef = collection(
      firestore,
      "chats",
      chatId,
      "messages"
    );
    const q = query(messagesCollectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });

    return () => {
      upadateUnreadtoRead(chatId);
      unsubscribe();
    };
  }, []);

  const checkingDate = (serverDate) => {
    if (!serverDate) {
      return false;
    }
    let date = serverDate?.toDate();
    date = moment(date).startOf("day");
    const display = moment(date).format("ddd DD, MMM");
    if (!chatDate.includes(display)) {
      chatDate.push(display);
      return display;
    } else {
      return false;
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}
        onContentSizeChange={scrollToBottom}
      >
        {messages.map((message) => {
          const isOverDay = checkingDate(message.createdAt);

          const ownMessage = user.username === message.sentBy;

          let timeSent = message?.createdAt?.toDate();
          timeSent = moment(timeSent).format("hh:mm");

          const timeStyle = ownMessage
            ? styles.timeContainer
            : styles.timeContainerOther;
          const bubbleColor = ownMessage ? COLOR.base600 : "#e9e9e9";
          return (
            <View key={message.id} style={styles.bubbleContainer}>
              {isOverDay && (
                <View style={{ alignItems: "center", marginBottom: 10 }}>
                  <Text style={styles.dateText}>{isOverDay}</Text>
                </View>
              )}

              <ChatBubble isOwnMessage={ownMessage} bubbleColor={bubbleColor}>
                <Text>{message.text}</Text>
                <View style={timeStyle}>
                  <Text style={styles.timeSendText}>{timeSent}</Text>
                </View>
              </ChatBubble>
            </View>
          );
        })}
      </KeyboardAwareScrollView>
      <View>
        <SendChat
          chatId={chatId}
          scrollToBottom={scrollToBottom}
          toUsername={toUsername}
        />
      </View>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingBottom: 30,
    flexGrow: 1,
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
  },
  bubbleContainer: {},
  bubbleChat: {
    marginBottom: 0,
  },
  timeContainer: {
    position: "absolute",
    bottom: 2,
    left: -38,
  },
  timeContainerOther: {
    position: "absolute",
    bottom: 2,
    right: -38,
  },
  timeSendText: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: "#b1b1b1",
  },
  dateText: {
    fontFamily: LEXEND.Regular,
    color: "#b1b1b1",
  },
});
