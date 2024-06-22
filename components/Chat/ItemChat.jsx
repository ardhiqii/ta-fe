import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "COLOR";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";

const ItemChat = ({ chatId, toUsername, latestMessage, unread }) => {
  const [toUsernameData, setToUsernameData] = useState();
  const { user } = useContext(UserContext);
  const isUrMessage = user.username === latestMessage.sentBy;

  const date = latestMessage?.createdAt?.toDate();
  const isOverDay = moment().diff(moment(date), "days") >= 1;

  const nav = useNavigation();
  const navigateToChat = () => {
    nav.navigate("ChatScreen", {
      chatId: chatId,
      toUsername: toUsername,
      toUserData: toUsernameData,
    });
  };

  const isThereUnread = unread?.length > 0;

  const getInfoToUsername = async () => {
    try {
      const { data } = await Player.Profile.getInfoOtherUsername(
        user.token,
        toUsername
      );
      setToUsernameData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfoToUsername();
  }, []);

  return (
    <Pressable onPress={navigateToChat} style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", columnGap: 8 }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: toUsernameData?.ava_url,
            }}
            style={styles.image}
          />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontFamily: LEXEND.SemiBold, fontSize: 14 }}>
              {toUsernameData?.name} - {toUsername}
            </Text>
            <Text
              style={[
                { fontFamily: LEXEND.Light, fontSize: 12, marginTop: 4 },
                isThereUnread && { color: COLOR.base900 },
              ]}
            >
              {isOverDay
                ? moment(date).fromNow()
                : moment(date).format("hh:mm")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontFamily: LEXEND.Light, fontSize: 12, width: "80%" }}
              numberOfLines={2}
            >
              {isUrMessage && "You: "}
              {latestMessage.text}
            </Text>
            {isThereUnread && (
              <View style={styles.unread}>
                <Text
                  style={{
                    fontFamily: LEXEND.SemiBold,
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  {unread?.length}
                </Text>
              </View>
            )}
          </View>
        </View>
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
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  unread: {
    backgroundColor: COLOR.base900,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
});
