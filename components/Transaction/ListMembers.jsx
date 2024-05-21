import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";
import ItemMember from "./ItemMember";
import { LEXEND } from "@fonts/LEXEND";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import CustomModal from "@components/CustomModal";
import InviteMemberModal from "./InviteMemberModal";

const ListMembers = ({ idReservation, roleReviewer }) => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);
  const { user } = useContext(UserContext);

  const isReviewerHost = roleReviewer === "host";

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await Player.Booking.getMembersById(
        user.token,
        idReservation
      );
      setMembers(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (forceRefresh) {
      setForceRefresh(false);
      fetchData();
    }
  }, [forceRefresh]);

  const removeMemberHandler = async (username) => {
    setLoading(true);
    try {
      const { data } = await Player.Booking.removeMemberByUsername(
        user.token,
        idReservation,
        username
      );
      setForceRefresh(true);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={styles.container}>
          {/* ### Header ### */}
          <View style={styles.header}>
            <Text style={{ fontFamily: LEXEND.SemiBold, color: COLOR.base900 }}>
              Members
            </Text>
            <View>
              {isReviewerHost && (
                <Pressable onPress={() => setVisible(true)}>
                  <FontAwesome5 name={"user-plus"} size={15} />
                </Pressable>
              )}
            </View>
          </View>
          {/* ### List Members */}
          {loading && <Text>Loading</Text>}
          {!loading && (
            <View>
              {members.map((m, i) => (
                <ItemMember
                  {...m}
                  index={i}
                  key={m.username + m.role + i}
                  removeMemberHandler={removeMemberHandler}
                  isReviewerHost={isReviewerHost}
                />
              ))}
            </View>
          )}
        </View>
      </View>
      <InviteMemberModal
        visible={visible}
        closeModal={() => setVisible(false)}
        token={user.token}
        idReservation={idReservation}
        setForceRefresh={setForceRefresh}
      />
    </>
  );
};

export default ListMembers;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    borderColor: COLOR.border,
  },
  header: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: COLOR.border,
  },
});
