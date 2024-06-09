import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { LEXEND } from "@fonts/LEXEND";

const PlayerCard = ({status,type}) => {
  const player = "player"+type
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems:'center', columnGap:5}}>
        <Text style={styles.nameText}>{status?.[player].name}</Text>
        {/* <Pressable>
          <MaterialIcons name="mode-edit" size={16} color={COLOR.accent2} />
        </Pressable> */}
      </View>
      {status?.[player].name !== "Player "+type && <Text style={{fontFamily:LEXEND.Light,color:'white', fontSize:10,}}>Player {type}</Text>}
    </View>
  );
};

export default PlayerCard;

const styles = StyleSheet.create({
  container: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
  },
  nameText: {
    fontFamily: LEXEND.SemiBold,
    fontSize: 16,
    color: "white",
  },
});
