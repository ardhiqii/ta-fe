import Card from "@components/SportVenue/Card";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { LEXEND } from "@fonts/LEXEND";
import { UserContext } from "store/user-contex";
import { ChatsContext } from "store/chats-context";
import LoadingOverlay from "@components/LoadingOverlay";

const ListSportVenuesScreen = () => {
  const [venuesData, setVenuesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const { allUnreads } = useContext(ChatsContext);

  const navigateToChat = () => {
    nav.navigate("ChatNavigation", {
      screen: "ChatsScreen",
    });
  };

  const fetchData = async () => {
    setLoading(true);
    const { data } = await Admin.SportVenue.getAllVenue(user.token);
    if (data) {
      setVenuesData(data);
    } else {
      setVenuesData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  const NavigateAddHandler = () => {
    nav.navigate("SportVenueNavigation", {
      screen: "EditManageSportVenueAdmin",
      params: {
        type: "AddNewVenue",
      },
    });
  };

  return (
    <>
      {loading && <ActivityIndicator size={"large"} />}

      {!loading && venuesData.length === 0 && (
        <View style={{ top: 40 }}>
          <Text
            style={{
              fontFamily: LEXEND.SemiBold,
              fontSize: 14,
              textAlign: "center",
              color: COLOR.border,
            }}
          >
            There is no any registered venue
          </Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {!loading &&
          venuesData.map((venue, i) => (
            <View key={i} style={{ rowGap: 16 }}>
              <Card {...venue} />
            </View>
          ))}
      </ScrollView>
      <Pressable
        style={({ pressed }) => [
          styles.addContainer,
          pressed && { opacity: 0.7 },
        ]}
        onPress={NavigateAddHandler}
      >
        <Ionicons name="add" size={35} color={COLOR.gold} />
      </Pressable>
    </>
  );
};

export default ListSportVenuesScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    rowGap: 16,
  },
  addContainer: {
    position: "absolute",
    bottom: 10,
    right: 30,
    borderRadius: 100,
    backgroundColor: COLOR.base900,
    padding: 5,
  },
  unread: {
    position: "absolute",
    top: -8,
    right: -5,
    zIndex: 99,
    backgroundColor: COLOR.accent2,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});
