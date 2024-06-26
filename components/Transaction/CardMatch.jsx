import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMatch } from "hooks/use-match";
import { Player } from "util/player/player";
const CardMatch = ({
  created_at,
  is_done,
  match_id: idMatchHistory,
  number,
  reservation_id: idReservation,
  score_a,
  score_b,
  isMember,
  index,
  fetchMatchHistores,
}) => {
  const { user } = useContext(UserContext);
  const nav = useNavigation();
  const { subscribeToMatch, fetchMatchOnce, deleteMatchFB } = useMatch();
  const [status, setStatus] = useState({
    teamA: {
      name: "Team A",
      score: score_a,
    },
    teamB: {
      name: "Team B",
      score: score_b,
    },
  });
  useEffect(() => {
    if (!idMatchHistory) return;
    if (is_done) {
      fetchMatchOnce(idMatchHistory, (data) => {
        setStatus(data);
      });
      return;
    }
    const unsubscribe = subscribeToMatch(idMatchHistory, (data) => {
      if (data) {
        setStatus(data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchMatchOnce(idMatchHistory, (data) => {
      setStatus(data);
    });
  }, [score_a, score_b]);

  const navigateToMatch = () => {
    nav.navigate("MatchNavigation", {
      screen: "MatchScreen",
      params: {
        idReservation,
        idMatchHistory,
      },
    });
  };
  const deleteMatch = async () => {
    const reqBody = {
      reservation_id: idReservation,
      match_history_id: idMatchHistory,
    };
    try {
      const { data } = await Player.Match.deleteMatch(user.token, reqBody);
      if (data) {
        deleteMatchFB(idMatchHistory);
        fetchMatchHistores();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const alertDeleteMatch = () => {
    const msg = `Are you sure want to delete match ${number}`;
    Alert.alert("Confirmation", msg, [
      {
        text: "Yes",
        onPress: deleteMatch,
      },
      {
        text: "No",
      },
    ]);
  };
  return (
    <Pressable
      onPress={navigateToMatch}
      style={({ pressed }) => [
        styles.container,
        index % 2 != 0
          ? { backgroundColor: "#c8eef0" }
          : { borderColor: "#c8eef0" }, pressed && {backgroundColor:'#cccccc49'}
      ]}
    >
      <Text style={[styles.text, { fontFamily: LEXEND.Bold }]}>{number}</Text>
      <View style={styles.match}>
        <Text style={[styles.text, styles.textTeam]} numberOfLines={1}>
          {status.teamA.name}
        </Text>
        <View style={styles.displayScore}>
          <Text style={styles.textScore}>{status.teamA.score}</Text>
          <Text style={styles.textScore}>:</Text>
          <Text style={styles.textScore}>{status.teamB.score}</Text>
        </View>
        <Text style={[styles.text, styles.textTeam]} numberOfLines={1}>
          {status.teamB.name}
        </Text>
      </View>

      {isMember && (
        <Pressable onPress={alertDeleteMatch} style={styles.delete}>
          <MaterialIcons
            name="delete-forever"
            size={18}
            color={COLOR.accent1}
          />
        </Pressable>
      )}
    </Pressable>
  );
};

export default CardMatch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  match: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  displayScore: {
    flexDirection: "row",
    alignItems: "'center",
    columnGap: 4,
    backgroundColor: COLOR.border,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  textScore: {
    fontFamily: LEXEND.Bold,
    color: "white",
    fontSize: 12,
  },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 11,
    color: COLOR.second700,
  },
  delete: {
    padding: 2,
  },
  textTeam: {
    width: 80,
    textAlign: "center",
  },
});
