import Card from "@components/SportVenue/Card";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import { useNavigation } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import { LEXEND } from "@fonts/LEXEND";


const ListSportVenuesScreen = () => {
  const [venuesData, setVenuesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await Admin.SportVenue.getAllVenue(TOKEN_TEMPORARY);
      if(data){
        setVenuesData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const NavigateAddHandler = () => {
    nav.navigate("EditManageSportVenueAdmin", { type: "AddNewVenue" });
  };

  if (loading)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  return (
    <>
    {
      venuesData.length === 0 && <View style={{top:40}}>
        <Text style={{fontFamily:LEXEND.SemiBold,fontSize:14,textAlign:'center',color:COLOR.border}}>There is not any registered venue</Text>
      </View>
    }
      <View style={styles.container}>
        {venuesData.map((venue, i) => (
          <View key={i} style={{rowGap:16,}}>
            <Card {...venue} />
            <View style={{ height: 2, backgroundColor: "#cfd8dc" }} />
          </View>
        ))}
      </View>
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
