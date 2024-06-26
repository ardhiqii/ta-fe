import Card from "@components/SportVenue/Card";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { useNavigation } from "@react-navigation/native";
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

  const IconRight = () => {
    return (
      <Pressable
        onPress={navigateToChat}
        style={{ marginRight: 20, marginTop: 4 }}
      >
        {allUnreads > 0 && (
          <View style={styles.unread}>
            <Text
              style={{
                fontFamily: LEXEND.SemiBold,
                fontSize: 11,
                color: "white",
              }}
            >
              {allUnreads}
            </Text>
          </View>
        )}
        <Ionicons name="chatbox-ellipses-outline" size={24} color={"white"} />
      </Pressable>
    );
  };

  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: true,
      title: "Your Sport Venue",
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: COLOR.base900,
      },
      headerTitleStyle: {
        fontFamily: LEXEND.SemiBold,
        fontSize: 28,
        color: "white",
      },
      headerTintColor: "white",
      headerShadowVisible: false,
      contentStyle: {
        backgroundColor: "white",
      },
      headerRight: () => <IconRight />,
    });
  }, [allUnreads]);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await Admin.SportVenue.getAllVenue(user.token);
    if (data) {
      setVenuesData(data);
    }
    setLoading(false);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchData();
  //   }, [nav])
  // );

  useEffect(() => {
    fetchData();
  }, []);

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

  if (loading) return <LoadingOverlay />;
  return (
    <>
      {venuesData.length === 0 && (
        <View style={{ top: 40 }}>
          <Text
            style={{
              fontFamily: LEXEND.SemiBold,
              fontSize: 14,
              textAlign: "center",
              color: COLOR.border,
            }}
          >
            There is not any registered venue
          </Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {venuesData.map((venue, i) => (
          <View key={i} style={{ rowGap: 16 }}>
            <Card {...venue} />
            <View style={{ height: 2, backgroundColor: "#cfd8dc" }} />
          </View>
        ))}
      </ScrollView>
      <Pressable style={styles.addContainer} onPress={NavigateAddHandler}>
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
    bottom: 50,
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
