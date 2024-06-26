import { LEXEND } from "@fonts/LEXEND";
import { useRoute } from "@react-navigation/native";
import { useMatch } from "hooks/use-match";
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";

const ItemPlayer = ({ username, index, team }) => {
  const { user } = useContext(UserContext);
  const { removePlayerTeamFB } = useMatch();
  const route = useRoute();
  const idMatchHistory = route?.params?.idMatchHistory;

  const isItYou = user?.username === username;

  const removeHandler = async () => {
    removePlayerTeamFB(idMatchHistory, team, username);
  };
  return (
    <Pressable
      style={[
        styles.container,
        index % 2 == 0 && { backgroundColor: "#c8eef0" },
      ]}
    >
      <View style={{ flexDirection: "row",alignItems:'center' }}>
        <Text style={{ fontFamily: LEXEND.Regular, fontSize: 12 }}>
          {index + 1} {username} {' '}
        </Text>
        {isItYou && (
          <Text style={{ fontFamily: LEXEND.Bold, fontSize: 12 }}>
            (You)
          </Text>
        )}
      </View>
      <View>
        <Pressable onPress={removeHandler}>
          <Text>Remove</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ItemPlayer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#c8eef0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
