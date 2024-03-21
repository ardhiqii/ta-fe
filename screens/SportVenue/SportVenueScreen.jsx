import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { Entypo } from "@expo/vector-icons";
import { COLOR } from "COLOR";
import HeadContent from "@components/SportVenue/Manage/HeadContent";
import HighlightContent from "@components/SportVenue/Manage/HighlightContent";
import InformationContent from "@components/SportVenue/Manage/InformationContent";
import ScheduleContent from "@components/SportVenue/Manage/ScheduleContent";
import Field from "@components/SportVenue/Manage/Field";
import ListFieldsContent from "@components/SportVenue/Manage/ListFieldsContent";

const token =
  "6DPsC-4Y57Lx3i9,P99Np5DlxC91kwB*NT1HX1:/(R5J33VtzHbVSY9n3f:P,NIUM245RiYvlcS0Jnh5X:Tnlz)8nwv:;+p02AXky9Y415*0*IS.Z9uc2L6izx?6<KxB";
const SportVenueScreen = () => {
  const [venueData, setVenueData] = useState();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { idVenue } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await Admin.SportVenue.getById(token, idVenue);
      // console.log(data);
      setLoading(false);
    };
    // fetchData();
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
        <Image
          source={{
            uri: "https://www.datra.id/uploads/project/50/gor-citra-bandung-c915x455px.png",
          }}
          style={styles.image}
        />
      </View>
      <HeadContent />
      <BorderLine />
      <HighlightContent />
      <BorderLine />
      <InformationContent />
      <BorderLine />
      <ScheduleContent />
      <BorderLine
        customStyle={{
          borderBottomWidth: 2,
          borderStyle: "dashed",
          paddingTop: 2,
        }}
      />
      <ListFieldsContent />
    </ScrollView>
  );
};

export default SportVenueScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50,
    rowGap: 12,
  },
  imageContainer: {
    borderBottomWidth: 2,
    borderColor: "#eceff1",
    alignItems: "center",
    justifyContent: "center",
    height: 216,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const BorderLine = ({ customStyle }) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: 4,
          borderColor: "#eceff1",
        },
        customStyle,
      ]}
    />
  );
};
