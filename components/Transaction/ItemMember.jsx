import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
const ItemMember = ({
  role,
  username,
  index,
  removeMemberHandler,
  isReviewerHost,
}) => {
  const isHost = role === "host";
  return (
    <View
      style={[
        styles.container,
        index % 2 != 0 && { backgroundColor: "#c8eef0" },
      ]}
    >
      <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>{username}</Text>
      <View
        style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}
      >
        {isHost && (
          <Text
            style={{
              fontFamily: LEXEND.Regular,
              fontSize: 12,
              textAlign: "center",
              color: COLOR.base900,
            }}
          >
            Host
          </Text>
        )}
        {isReviewerHost && !isHost && (
          <Pressable
            onPress={removeMemberHandler.bind(this, username)}
            style={{ paddingVertical: 5, paddingHorizontal: 4 }}
          >
            <FontAwesome5 name={"user-times"} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ItemMember;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
});
