import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { Entypo } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import HeadContent from "@components/SportVenue/Manage/HeadContent";
import HighlightContent from "@components/SportVenue/Manage/HighlightContent";
import InformationContent from "@components/SportVenue/Manage/InformationContent";
import ScheduleContent from "@components/SportVenue/Manage/ScheduleContent";
const token =
  "6DPsC-4Y57Lx3i9,P99Np5DlxC91kwB*NT1HX1:/(R5J33VtzHbVSY9n3f:P,NIUM245RiYvlcS0Jnh5X:Tnlz)8nwv:;+p02AXky9Y415*0*IS.Z9uc2L6izx?6<KxB";
const ManageSportVenueScreen = () => {
  const [venueData, setVenueData] = useState();
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { idVenue } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await Admin.SportVenue.getById(token, idVenue);
      // console.log(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Entypo name="cross" size={48} color={COLOR.second800} />
      </View>
      <HeadContent />
      <BorderLine />
      <HighlightContent />
      <BorderLine />
      <InformationContent />
      <BorderLine />
      <ScheduleContent />
      <BorderLine />
    </ScrollView>
  );
};

export default ManageSportVenueScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    rowGap: 12,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "#eceff1",
    alignItems: "center",
    justifyContent: "center",
    height: 216,
  },
});

const BorderLine = () => {
  return (
    <View
      style={{
        height: 4,
        backgroundColor: "#eceff1",
      }}
    />
  );
};
