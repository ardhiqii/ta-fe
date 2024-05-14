import EditHeadContent from "@components/SportVenue/EditMode/EditHeadContent";
import EditInformationContent from "@components/SportVenue/EditMode/EditInformationContent";
import InformationContent from "@components/SportVenue/InformationContent";
import ListFieldsContent from "@components/SportVenue/ListFieldsContent";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import HighlightContent from "@components/SportVenue/HighlightContent";
import ScheduleContent from "@components/SportVenue/ScheduleContent";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingOverlay from "@components/LoadingOverlay";
import { Admin } from "util/admin/admin";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import { UserContext } from "store/user-contex";

const TYPEMANAGE = {
  Add: "AddNewVenue",
  Edit: "EditVenue"
};

const EditManageSportScreen = () => {
  const {user} = useContext(UserContext)
  const route = useRoute();
  const nav = useNavigation();
  const idVenue = route?.params?.idVenue;
  const dataVenue = route?.params?.dataVenue;
  const type = route?.params?.type;
  const [newData, setNewData] = useState({
    id: idVenue ? idVenue : null,
    Sport_Kind_id: null,
    name: null,
    geo_coordinate: null,
    is_bike_parking: false,
    is_car_parking: false,
    is_public: false,
    description: null,
    rules: null,
    time_open: null,
    time_closed: null,
    price_per_hour: null,
  });
  const [loading, setLoading] = useState(false);

  const headData = {
    name: dataVenue?.name,
    category: dataVenue?.Sport_Kind_Name?.toLowerCase(),
    price_per_hour: dataVenue?.price_per_hour,
  };

  const infoData = {
    description: dataVenue?.description,
    geo_coordinate: dataVenue?.geo_coordinate,
    is_bike_parking: dataVenue?.is_bike_parking,
    is_car_parking: dataVenue?.is_car_parking,
    is_public: dataVenue?.is_public,
    rules: dataVenue?.rules,
    price_per_hour: dataVenue?.price_per_hour,
    time_open: dataVenue?.time_open,
    time_closed: dataVenue?.time_closed
  };


  const alertConfirmation = () => {
    const alertMessage = `Are you sure want to ${type == TYPEMANAGE.Add ? "add venue" : "save"}?`
    Alert.alert("Confirmation", alertMessage, [
      {
        text: "Ok",
        onPress: saveHandler,
      },
      {
        text: "cancel",
      },
    ]);
  };
  const saveHandler = async () => {
    setLoading(true);
    console.log(newData);
 
    if (type === TYPEMANAGE.Add) {
      console.log("ADDING");
      console.log(newData);
      const data = await Admin.SportVenue.addVenue(user.token, newData);
      console.log(data);

    } else {
      const data = await Admin.SportVenue.editVenue(user.token, newData);
      console.log(data);
    }

    setLoading(false);
    nav.goBack();
  };

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
      <View style={styles.editContainer}>
        <Pressable style={{ alignItems: "center" }} onPress={alertConfirmation}>
          <Feather name="save" size={24} color={"black"} />
          <Text style={{ fontFamily: LEXEND.Regular }}>{type ? type : "Save"}</Text>
        </Pressable>
        <Pressable style={{ alignItems: "center" }}>
          <Feather
            name="x"
            size={24}
            color={"black"}
            onPress={() => nav.goBack()}
          />
          <Text style={{ fontFamily: LEXEND.Regular }}>Cancel</Text>
        </Pressable>
      </View>
      <EditHeadContent
        name={newData.name}
        setNewData={setNewData}
        oldData={headData}
      />
      {/* <BorderLine />
      <HighlightContent />
      <BorderLine /> */}
      <EditInformationContent
        {...newData}
        setNewData={setNewData}
        oldData={infoData}
      />
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
      {loading && <LoadingOverlay />}
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
    flexDirection: "row",
    columnGap: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 25,
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
