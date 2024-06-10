import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";

const ItemChat = ({ chatId, toUsername, latestMessage }) => {
  const { user } = useContext(UserContext);
  const isUrMessage = user.username === latestMessage.sentBy;

  const date = latestMessage?.createdAt?.toDate();
  const isOverDay = moment().diff(moment(date), "days") >= 1;


  const nav = useNavigation();
  const navigateToChat = () => {
    nav.navigate("ChatScreen", { chatId: chatId,toUsername:toUsername });
  };
  return (
    <Pressable onPress={navigateToChat} style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/8/87/Haerin_%28NewJeans%29_220813.jpg",
            }}
            style={styles.image}
          />
        </View>
        <View style={{width:'75%'}}>
          <Text style={{ fontFamily: LEXEND.SemiBold, fontSize: 14 }}>
            {toUsername}
          </Text>
          <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }} numberOfLines={1}>
            {isUrMessage && "You: "}
            {latestMessage.text}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>
          {isOverDay ? moment(date).fromNow() : moment(date).format("hh:mm")}
        </Text>
      </View>
    </Pressable>
  );
};

export default ItemChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  imageContainer: {
    overflow: "hidden",
    width: 45,
    height: 45,
    borderRadius: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
