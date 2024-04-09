import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { Feather } from "@expo/vector-icons";
import HeadContent from "@components/SportVenue/HeadContent";
import HighlightContent from "@components/SportVenue/HighlightContent";
import InformationContent from "@components/SportVenue/InformationContent";
import ScheduleContent from "@components/SportVenue/ScheduleContent";
import ListFieldsContent from "@components/SportVenue/ListFieldsContent";
import { useNavigation } from "@react-navigation/native";

const token =
  "6DPsC-4Y57Lx3i9,P99Np5DlxC91kwB*NT1HX1:/(R5J33VtzHbVSY9n3f:P,NIUM245RiYvlcS0Jnh5X:Tnlz)8nwv:;+p02AXky9Y415*0*IS.Z9uc2L6izx?6<KxB";
const SportVenueScreen = () => {
  const [venueData, setVenueData] = useState();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { idVenue } = route.params;
  const nav = useNavigation()


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await Admin.SportVenue.getById(token, idVenue);
      // console.log(data);
      setLoading(false);
    };
    // fetchData();
  }, []);


  const NavigateToEdit = () =>{
    nav.navigate("EditManageSportVenueAdmin")
  }


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
        <Pressable style={styles.editContainer} onPress={NavigateToEdit}>
          <Feather name="edit" size={24} color={"white"} />
        </Pressable>
      </View>
      <HeadContent edit={editMode}/>
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
  editContainer: {
    position: "absolute",
    backgroundColor: "#c8c8c8b6",
    top: 10,
    right: 15,
    width: 40,
    height:40,
    borderRadius:30,
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    
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


