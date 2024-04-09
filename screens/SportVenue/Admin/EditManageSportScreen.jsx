import EditHeadContent from "@components/SportVenue/EditMode/EditHeadContent";
import EditInformationContent from "@components/SportVenue/EditMode/EditInformationContent";
import InformationContent from "@components/SportVenue/InformationContent";
import ListFieldsContent from "@components/SportVenue/ListFieldsContent";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import HighlightContent from "@components/SportVenue/HighlightContent";
import ScheduleContent from "@components/SportVenue/ScheduleContent";

const EditManageSportScreen = () => {
  const [newData, setNewData] = useState({});
  useEffect(() => {
    console.log(newData);
  }, [newData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://www.datra.id/uploads/project/50/gor-citra-bandung-c915x455px.png",
          }}
          style={styles.image}
        />
        <Pressable style={styles.editContainer}>
          <Feather name="edit" size={24} color={"white"} />
        </Pressable>
      </View>
      <EditHeadContent name={newData.name} category={newData.category} setNewData={setNewData} />
      {/* <BorderLine />
      <HighlightContent />
      <BorderLine /> */}
      <EditInformationContent {...newData} setNewData={setNewData}/>
      {/* <BorderLine />
      <ScheduleContent />
      <BorderLine
        customStyle={{
          borderBottomWidth: 2,
          borderStyle: "dashed",
          paddingTop: 2,
        }}
      />
      <ListFieldsContent /> */}
    </ScrollView>
  );
};

export default EditManageSportScreen;

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
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
