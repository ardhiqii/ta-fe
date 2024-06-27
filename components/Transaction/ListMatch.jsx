import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";
import CardMatch from "./CardMatch";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { MaterialIcons } from "@expo/vector-icons";
import { useMatch } from "hooks/use-match";

const ListMatch = ({ membersData, roleReviewer }) => {
  const route = useRoute();
  const { user } = useContext(UserContext);
  const {createMatchFB} = useMatch()
  const idReservation = route?.params?.idReservation;
  const [matchHistories, setMatchHistories] = useState([]);
  
  const isMember = checkingIsMembers(membersData, user.username);
  const fetchMatchHistores = async () => {
    try {
      const { data } = await Player.Match.getAllMatchHistories(
        user.token,
        idReservation
      );
      if (data) {
        const sorted = data.sort((a, b) => a.number - b.number);
        setMatchHistories(sorted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMatchHistores();
  }, []);

  const createMatchHandler = async () => {
    
    const matchLength = matchHistories.length
    let lastNumber = matchLength > 0 ? matchHistories[matchLength - 1].number : 0
    lastNumber++;
    const reqBody = {
      reservation_id: idReservation,
      match_number: lastNumber,
    };
    try {
      const { data } = await Player.Match.createMatch(user.token, reqBody);
      if (data) {
        const idMatchHistory = data.match_history_id
        createMatchFB(idMatchHistory)
        fetchMatchHistores();
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: LEXEND.SemiBold, color: COLOR.base900 }}>
          Match History
        </Text>
        <View style={{ flexDirection: "row", columnGap: 20 }}>
          <Pressable onPress={fetchMatchHistores}>
            <MaterialIcons name="refresh" size={20} color={COLOR.base900} />
          </Pressable>
          {isMember && (
            <Pressable onPress={createMatchHandler}>
              <MaterialIcons name="add-circle-outline" size={20} />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.matchHistories}>
        {matchHistories?.length === 0 && (
          <Text
            style={{
              fontFamily: LEXEND.SemiBold,
              fontSize: 12,
              textAlign: "center",
              color: COLOR.border,
              marginTop:10,
            }}
          >
            There is no match history yet
          </Text>
        )}
        {matchHistories?.length > 0 &&
          matchHistories.map((m,i) => <CardMatch key={m.created_at} {...m} isMember={isMember} index={i} fetchMatchHistores={fetchMatchHistores} />)}
      </View>
    </View>
  );
};

export default ListMatch;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  matchHistories: {
    rowGap: 8,
  },
});

const checkingIsMembers = (membersData = [], username) => {
  const included = membersData.filter((m) => m.username === username)[0];
  return !!included;
};
