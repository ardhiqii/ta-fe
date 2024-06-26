import BottomActionLayout from "@components/BottomActionLayout";
import LoadingOverlay from "@components/LoadingOverlay";
import ManageMatch from "@components/Match/ManageMatch";
import ScoreDisplay from "@components/Match/ScoreDisplay";
import TeamMembers from "@components/Match/TeamMembers";
import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { useRoute } from "@react-navigation/native";
import { useMatch } from "hooks/use-match";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";

const MatchScreen = () => {
  const route = useRoute();
  const { user } = useContext(UserContext);
  const { subscribeToMatch } = useMatch();
  const idReservation = route?.params?.idReservation;
  const idMatchHistory = route?.params?.idMatchHistory;

  const [status, setStatus] = useState({
    teamA: {
      name: "Team A",
      score: 0,
    },
    teamB: {
      name: "Team B",
      score: 0,
    },
    changeScoreValue: 1,
  });
  const [matchData, setMatchData] = useState();
  const [members, setMembers] = useState();
  const [loading, setLoading] = useState(true);

  const fetchMatchData = async () => {
    try {
      const { data } = await Player.Match.getMatchHistory(
        user.token,
        idReservation,
        idMatchHistory
      );
      if (data) {
        setMatchData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMemberData = async () => {
    try {
      const { data } = await Player.Booking.getMembersById(
        user.token,
        idReservation
      );
      if (data) {
        setMembers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initData = async () => {
    try {
      await Promise.all([fetchMatchData(), fetchMemberData()]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    initData();
    if (!idMatchHistory) {
      setLoading(false);
      return;
    }
    const unsubscribe = subscribeToMatch(idMatchHistory, (data) => {
      setStatus(data);
    });
    setLoading(false);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ScoreDisplay status={status} />
        <BorderLine />
        <ManageMatch status={status} setStatus={setStatus} />
        <BorderLine />
        <TeamMembers status={status} listPlayers={members} type={"A"}/>
        <TeamMembers status={status} listPlayers={members} type={"B"}/>
      </ScrollView>
      <BottomActionLayout>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textAction}>Match status: </Text>
          <Text style={[styles.textAction, { fontFamily: LEXEND.SemiBold }]}>
            {matchData?.is_done ? "Done" : "Not Done"}
          </Text>
        </View>
        <Button>
          <Text>Start</Text>
        </Button>
      </BottomActionLayout>
      {loading && <LoadingOverlay />}
    </>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 12,
  },
  textAction: {
    fontFamily: LEXEND.Regular,
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
