import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ManageTeam } from "./ManageTeam";
import Input from "@components/Input";
import { LEXEND } from "@fonts/LEXEND";
import { Player } from "util/player/player";
import { UserContext } from "store/user-contex";
import { useMatch } from "hooks/use-match";
import { useRoute } from "@react-navigation/native";

const ManageMatch = ({ status, setStatus }) => {
  const { user } = useContext(UserContext);
  const { updateMatchFB } = useMatch();
  const route = useRoute();

  const idMatchHistory = route?.params?.idMatchHistory;
  const fethingMembers = async () => {
    try {
      const { data } = await Player.Booking.getMembersById(user.token);
    } catch (error) {
      console.log(error);
    }
  };

  const configGradient = {
    colors: ["#3e82f5", "#bcdcfc"],
    start: [0.3, 0],
    end: [0.8, 0],
  };

  const changeScoreValueHandler = (value) => {
    let newValue = parseInt(value);
    if (isNaN(newValue)) {
      newValue = 1;
    }
    if (newValue < 1) {
      return;
    }
    setStatus((prev) => {
      return { ...prev, changeScoreValue: newValue };
    });
    updateMatchFB(idMatchHistory, {
      changeScoreValue: newValue,
    });
  };
  return (
    <View style={styles.container}>
      <ManageTeam type={"A"} setStatus={setStatus} status={status} />
      <ManageTeam type={"B"} setStatus={setStatus} status={status} />

      <View style={{ flexDirection: "row", columnGap: 4 }}>
        <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>
          Change Score Value:{" "}
        </Text>
        <Input
          value={status?.changeScoreValue.toString()}
          inputContainerStyle={styles.inputContainer}
          onUpdateValue={changeScoreValueHandler}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};

export default ManageMatch;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    rowGap: 8,
  },
  inputContainer: {
    fontSize: 8,
    height: 20,
    width: 40,
    paddingVertical: 0,
    paddingHorizontal: 4,
  },
});
