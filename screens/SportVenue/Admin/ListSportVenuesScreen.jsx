import Card from "@components/SportVenue/Card";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import { LEXEND } from "@fonts/LEXEND";
import { UserContext } from "store/user-contex";

const ListSportVenuesScreen = () => {
  const [venuesData, setVenuesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await Admin.SportVenue.getAllVenue(user.token);
    if (data) {
      setVenuesData(data);
    }
    setLoading(false);
  };

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

  if (loading)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
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
    marginTop: 12,
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
});
