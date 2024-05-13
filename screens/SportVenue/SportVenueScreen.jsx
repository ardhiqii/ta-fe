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
import { useRoute } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { Feather, Ionicons } from "@expo/vector-icons";
import HeadContent from "@components/SportVenue/HeadContent";
import InformationContent from "@components/SportVenue/InformationContent";
import { useNavigation } from "@react-navigation/native";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import { TEMPORARY_ROLE } from "constant/DUMMY_ROLE";
import { Player } from "util/player/player";
import { UserContext } from "store/user-contex";
import ReservationContent from "@components/SportVenue/ReservationContent";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";

const SportVenueScreen = () => {
  const [venueData, setVenueData] = useState();
  const [fieldsData, setFieldsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { idVenue } = route.params;
  const editMode = route?.params?.editMode;
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const isAdmin = TEMPORARY_ROLE == "admin";

  const fetchVenueData = async () => {
    try {
      const coordinate = `${user.coordinate.lat}, ${user.coordinate.lng} `;
      const { data } = isAdmin
        ? await Admin.SportVenue.getById(TOKEN_TEMPORARY, idVenue)
        : await Player.SportVenue.getById(TOKEN_TEMPORARY, idVenue, coordinate);

      return data;
    } catch (e) {
      console.log("Error Occured in fetch venue data, Sport Venue Screen");
      console.log(e);
      return null;
    }
  };

  const fetchFieldsData = async () => {
    try {
      const { data } = isAdmin
        ? await Admin.SportVenue.getAllFields(TOKEN_TEMPORARY, idVenue)
        : await Player.SportVenue.getAllFields(TOKEN_TEMPORARY, idVenue);

      const sorted = data.sort((a, b) => a.number - b.number);
      return sorted;
    } catch (e) {
      console.log("Error Occured in fetch fields data, Sport Venue Screen");
      console.log(e);
      return null;
    }
  };
  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      const [vd, fd] = await Promise.all([fetchVenueData(), fetchFieldsData()]);
      setVenueData(vd);
      setFieldsData(fd);
      setLoading(false);
    };
    initData();
  }, []);

  const NavigateToEdit = () => {
    nav.navigate("EditManageSportVenueAdmin", {
      idVenue: idVenue,
      dataVenue: venueData,
      type: "EditVenue",
    });
  };


  const deleteHandler = async () => {
    try {
      const response = await Admin.SportVenue.deleteVenue(
        TOKEN_TEMPORARY,
        idVenue
      );
    } catch (e) {
      console.log("Error occured in deleteHandler, SportVenueScreen");
      console.log(e);
    }
  };

  const alertDeleteConfirmation = () => {
    Alert.alert("Confirmation", "Are you sure want to delete this venue?", [
      {
        text: "Yes",
        onPress: deleteHandler,
      },
      {
        text: "Cancel",
      },
    ]);
  };

  if (loading)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );

  if (venueData === "not public") {
    return (
      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            fontFamily: LEXEND.SemiBold,
            fontSize: 20,
            textAlign: "center",
            color: COLOR.border,
          }}
        >
          This venue on private
        </Text>
      </View>
    );
  }

  const headData = {
    name: venueData?.name,
    category: venueData?.Sport_Kind_Name.toLowerCase(),
    price_per_hour: venueData?.price_per_hour,
  };

  const infoData = {
    description: venueData?.description,
    geo_coordinate: venueData?.geo_coordinate,
    is_bike_parking: venueData?.is_bike_parking,
    is_car_parking: venueData?.is_car_parking,
    is_public: venueData?.is_public,
    rules: venueData?.rules,
  };

  const reservastionData = {
    name: venueData?.name,
    fieldsData: fieldsData,
    category: venueData?.Sport_Kind_Name.toLowerCase(),
    time_open: venueData?.time_open,
    time_closed: venueData?.time_closed,
  };

  const listButtons = [
    {
      name: "Edit",
      onPress: NavigateToEdit,
      icon: <Feather name="edit" size={24} color={"black"} />,
    },
    {
      name: "Delete",
      onPress: alertDeleteConfirmation,
      icon: <Feather name="trash-2" size={24} color={"red"} />,
    },
  ];

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
      {editMode && (
        <>
          <ManageVenueButtons listButtons={listButtons} />
          <BorderLine />
        </>
      )}
      <HeadContent {...headData} />
      {/* <BorderLine />
      <HighlightContent />
      <BorderLine /> */}
      <BorderLine />
      <InformationContent {...infoData} />
      <BorderLine />
      <ReservationContent {...reservastionData} />
      {/* <ScheduleContent />
      <BorderLine
        customStyle={{
          borderBottomWidth: 2,
          borderStyle: "dashed",
          paddingTop: 2,
        }}
      />
      <ListFieldsContent data={fieldsData} category={venueData?.Sport_Kind_Name.toLowerCase()} time_open={venueData?.time_open} time_closed={venueData?.time_closed}/> */}
    </ScrollView>
  );
};

export default SportVenueScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
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

const ManageVenueButtons = ({ listButtons }) => {
  return (
    <View style={manageStyles.container}>
      {listButtons.map((item) => (
        <View key={item.name} style={{ alignItems: "center" }}>
          <Pressable onPress={item.onPress} style={manageStyles.iconContainer}>
            {item.icon}
          </Pressable>
          <Text style={{ fontFamily: LEXEND.Regular, fontSize: 12 }}>
            {item.name}
          </Text>
        </View>
      ))}
    </View>
  );
};

const manageStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexDirection: "row",
    columnGap: 14,
  },
  iconContainer: {},
});

{
  /* <View style={styles.editModeContainer}>
      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.editContainer} onPress={NavigateToEdit}>
          <Feather name="edit" size={24} color={"white"} />
        </Pressable>
        <Text style={{ fontFamily: LEXEND.Regular, fontSize: 12 }}>
          Edit Venue
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.editContainer} onPress={NavigateToEdit}>
          <Feather name="edit" size={24} color={"white"} />
        </Pressable>
        <Text>Blacklist Schedule</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Pressable
          onPress={alertDeleteConfirmation}
          style={[styles.editContainer, { backgroundColor: "#fb5f5fb6" }]}
        >
          <Feather name="trash-2" size={24} color={"white"} />
        </Pressable>
        <Text>Delete</Text>
      </View>
    </View> */
}
