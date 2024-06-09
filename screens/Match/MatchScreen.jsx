import ManageMatch from "@components/Match/ManageMatch";
import ScoreDisplay from "@components/Match/ScoreDisplay";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const MatchScreen = () => {
  const [status,setStatus] = useState({
    playerA: {
      name: "Player A",
      score: 0,
    },
    playerB: {
      name: "Player B",
      score: 0,
    },
    changeScoreValue: 1,
  });
  return (
    <View style={styles.container}>
      <ScoreDisplay status={status} />
      <BorderLine />
      <ManageMatch status={status} setStatus={setStatus}/>
    </View>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 12,
  },
});

const BorderLine = ({ customStyle }) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: 3,
          borderColor: "#eceff1",
        },
        customStyle,
      ]}
    />
  );
};
