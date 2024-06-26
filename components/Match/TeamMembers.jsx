import { LEXEND } from "@fonts/LEXEND";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AddPlayersModal from "./AddPlayersModal";
import ItemPlayer from "./ItemPlayer";
import { COLOR } from "COLOR";

const TeamMembers = ({ status, listPlayers, type }) => {
  const [visible, setVisible] = useState(false);
  const [unsignedPlayers, setUnsignedPlayers] = useState([]);
  const [currTeamPlayers, setCurrTeamPlayers] = useState([]);

  useEffect(() => {
    const currTeam =
      type === "A" ? status?.teamA?.players : status?.teamB?.players;
    if (currTeam) {
      setCurrTeamPlayers(currTeam);
    }

    const playersTeamA = status?.teamA?.players;
    const playersTeamB = status?.teamB?.players;
    const filtered = listPlayers?.filter((p) => {
      return (
        !playersTeamA?.includes(p.username) &&
        !playersTeamB?.includes(p.username)
      );
    });
    setUnsignedPlayers(filtered);
  }, [status?.teamA?.players, status?.teamB?.players, listPlayers]);
  const teamPlayersFB = type === "A" ? `teamA.players` : "teamB.players";

  return (
    <>
      <View style={style.container}>
        <View style={style.header}>
          <Text style={{ fontFamily: LEXEND.Regular, fontSize: 14 }}>
            Players Team {type}:
          </Text>
          <Pressable onPress={() => setVisible(true)}>
            <Text>Add</Text>
          </Pressable>
        </View>
        <View style={style.teamMembers}>
          {currTeamPlayers?.length <= 0 && (
            <Text
              style={{
                fontFamily: LEXEND.SemiBold,
                fontSize: 14,
                textAlign: "center",
                color: COLOR.border,
              }}
            >
              There is no player
            </Text>
          )}
          {currTeamPlayers?.map((m, i) => (
            <ItemPlayer
              team={teamPlayersFB}
              username={m}
              index={i}
              key={i + m}
            />
          ))}
        </View>
      </View>
      <AddPlayersModal
        listPlayers={unsignedPlayers}
        visible={visible}
        closeModal={() => setVisible(false)}
        type={type}
      />
    </>
  );
};

export default TeamMembers;

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  teamMembers: {
    rowGap: 8,
    marginTop: 6,
  },
});
