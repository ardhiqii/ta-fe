import ManageMatch from "@components/Match/ManageMatch";
import ScoreDisplay from "@components/Match/ScoreDisplay";
import { useRoute } from "@react-navigation/native";
import { useMatch } from "hooks/use-match";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";

const MatchScreen = () => {
  const route = useRoute()
  const {user} = useContext(UserContext)
  const {subscribeToMatch} = useMatch()
  const idReservation = route?.params?.idReservation
  const idMatchHistory = route?.params?.idMatchHistory

  const [status,setStatus] = useState({
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

  useEffect(()=>{
    if(!idMatchHistory) return
    const unsubscribe = subscribeToMatch(idMatchHistory,(data)=>{
      setStatus(data)
    })

    return ()=>{
      unsubscribe()
    }
  },[])



  const fetchMatchData = async () =>{
    try {
      const {data} = await Player.Match.getMatchHistory(user.token,idReservation,idMatchHistory)
      if(data){
        
      }
    } catch (error) {
      console.log(error);
    }
  }

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
