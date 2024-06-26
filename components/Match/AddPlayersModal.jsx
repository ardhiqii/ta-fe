import CustomModal from "@components/CustomModal";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";
import ItemAddPlayer from "./ItemAddPlayer";
import { useMatch } from "hooks/use-match";
import { useRoute } from "@react-navigation/native";
import { COLOR } from "COLOR";
import { Player } from "util/player/player";
import { UserContext } from "store/user-contex";
const heightDevice = Dimensions.get("window").height;

const AddPlayersModal = ({ visible, closeModal, listPlayers, type }) => {
  const { user } = useContext(UserContext);
  const route = useRoute();
  const idMatchHistory = route?.params?.idMatchHistory;
  const idReservation = route?.params?.idReservation;
  const [selected, setSelected] = useState([]);
  const { updatePlayersTeamFB } = useMatch();

  const addPlayersHanlder = async () => {
    const teamFB = "team" + type + ".players";
    const resp = updatePlayersTeamFB(idMatchHistory, teamFB, selected);
    try {
      const promiseArray = selected.map((username) => {
        return Player.Match.addPlayerToTeam(
          user.token,
          idReservation,
          idMatchHistory,
          username,
          type.toLowerCase()
        );
      });
      await Promise.all(promiseArray);
    } catch (error) {
      console.log(error);
    }
    setSelected([]);
    closeModal();
  };
  return (
    <CustomModal
      style={styles.outerModal}
      visible={visible}
      closeModal={closeModal}
      animationType={"slide"}
    >
      <View style={styles.modalContainer}>
        <View style={styles.navContainer}>
          <Pressable onPress={closeModal}>
            <Ionicons name="close" size={30} />
          </Pressable>
          <Text style={{ fontFamily: LEXEND.SemiBold, fontSize: 20 }}>
            Add Player
          </Text>
        </View>
        <Text
          style={{
            textAlign: "center",
            fontFamily: LEXEND.Light,
            fontSize: 14,
          }}
        >
          Choose players for Team {type}
        </Text>
        <ScrollView contentContainerStyle={styles.listPlayers}>
          {listPlayers?.map((p, i) => {
            return (
              <ItemAddPlayer
                key={p.username + i}
                {...p}
                setSelected={setSelected}
                selected={selected}
              />
            );
          })}
        </ScrollView>
        <View style={styles.bottomActions}>
          <Pressable
            onPress={addPlayersHanlder}
            style={[styles.button, { backgroundColor: COLOR.base600 }]}
          >
            <Text style={styles.buttonText}>Done</Text>
          </Pressable>
          <Pressable
            onPress={closeModal}
            style={[styles.button, { backgroundColor: COLOR.accent1 }]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </CustomModal>
  );
};

export default AddPlayersModal;

const styles = StyleSheet.create({
  outerModal: {
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%",
    height: heightDevice * 0.65,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
    rowGap: 12,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  listPlayers: {
    rowGap: 10,
  },
  bottomActions: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 12,
  },
  button: {
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: LEXEND.SemiBold,
    fontSize: 14,
  },
});
