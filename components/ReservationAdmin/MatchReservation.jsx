import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "COLOR";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ChatsContext } from "store/chats-context";

const MatchReservation = ({
  hostName,
  mabarName,
  date,
  timeStart,
  timeEnd,
  idReservation,
}) => {
  const { createNewChatWithOtherUser } = useContext(ChatsContext);
  const nav = useNavigation();

  const chatUser = async () => {
    try {
      const chatId = await createNewChatWithOtherUser(hostName);

      nav.navigate("ChatNavigation", {
        screen: "ChatScreen",
        params: { chatId: chatId, toUsername: hostName },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subText}>ID Reservation</Text>
        <Text style={styles.text}>{idReservation}</Text>
      </View>
      <View style={styles.layout}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subText}>Match Name</Text>
          <Text style={styles.text}>{mabarName}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 12,
          }}
        >
          <View>
            <Text style={styles.subText}>Host</Text>
            <Text style={styles.text}>{hostName}</Text>
          </View>
          <Pressable
            onPress={chatUser}
            style={({ pressed }) => [
              styles.buttonContainer,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Text
              style={{
                fontFamily: LEXEND.SemiBold,
                fontSize: 12,
                color: COLOR.base700,
              }}
            >
              Chat
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.layout}>
        <View style={{ flex: 1 }}>
          <Text style={styles.subText}>Date</Text>
          <Text style={styles.text}>{date}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.subText}>Time</Text>
          <Text style={styles.text}>
            {timeStart.slice(0, -3)} - {timeEnd.slice(0, -3)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MatchReservation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 8,
  },
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold, fontSize: 12 },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
  },
  layout: {
    flexDirection: "row",
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: COLOR.base700,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
