import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { Feather } from "@expo/vector-icons";
import HeadContent from "@components/SportVenue/HeadContent";
import InformationContent from "@components/SportVenue/InformationContent";
import { useNavigation } from "@react-navigation/native";
import { Player } from "util/player/player";
import { UserContext } from "store/user-contex";
import ReservationContent from "@components/SportVenue/ReservationContent";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import Button from "@components/UI/Button";
import AlbumContent from "./AlbumContent";
import LoadingOverlay from "@components/LoadingOverlay";
import BottomActionLayout from "@components/BottomActionLayout";

const SportVenueScreen = () => {
  const [venueData, setVenueData] = useState();
  const [albumData, setAlbumData] = useState([]);
  const [fieldsData, setFieldsData] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { idVenue } = route.params;
  const editMode = route?.params?.editMode;
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const isAdmin = user?.role == "admin";

  const fetchVenueData = async () => {
    try {
      const coordinate = `${user?.coordinate?.lat}, ${user?.coordinate?.lng} `;
      const { data } = isAdmin
        ? await Admin.SportVenue.getById(user.token, idVenue)
        : await Player.SportVenue.getById(user.token, idVenue, coordinate);
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
        ? await Admin.SportVenue.getAllFields(user.token, idVenue)
        : await Player.SportVenue.getAllFields(user.token, idVenue);

      const sorted = data.sort((a, b) => a.number - b.number);
      return sorted;
    } catch (e) {
      console.log("Error Occured in fetch fields data, Sport Venue Screen");
      console.log(e);
      return null;
    }
  };

  const fetchAlbum = async () => {
    try {
      const { data } = isAdmin
        ? await Admin.SportVenue.getAlbumVenuById(user.token, idVenue)
        : await Player.SportVenue.getAlbumVenuById(user.token, idVenue);
      return data;
    } catch (e) {
      console.log("Error occured fetchAlbum SportVenueScreen", e);
      return null;
    }
  };

  const initData = async () => {
    setLoading(true);

    const [vd, fd, ad] = await Promise.all([
      fetchVenueData(),
      fetchFieldsData(),
      fetchAlbum(),
    ]);
    setVenueData(vd);
    setFieldsData(fd);
    setAlbumData(ad);
    setLoading(false);
  };
  useEffect(() => {
    initData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      initData();
    }, [])
  );

  const updateAlbumData = async () => {
    const ad = await fetchAlbum();
    setAlbumData(ad);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     initData();
  //   }, [nav])
  // );

  const onRefresh = useCallback(() => {
    initData();
  }, []);

  useEffect(() => {
    if (forceRefresh) {
      initData();
      setForceRefresh(false);
    }
  }, [forceRefresh]);

  const NavigateToEdit = () => {
    nav.navigate("EditManageSportVenueAdmin", {
      idVenue: idVenue,
      dataVenue: venueData,
      albumData: albumData,
      type: "EditVenue",
    });
  };

  const deleteHandler = async () => {
    try {
      const response = await Admin.SportVenue.deleteVenue(user.token, idVenue);
      if (response) {
        Alert.alert("Delete Venue Successfully");
        nav.goBack();
      }
    } catch (e) {
      console.log("Error occured in deleteHandler, SportVenueScreen");
      console.log(e);
    }
  };

  const alertDeleteConfirmation = () => {
    Alert.alert("Confirmation", "Are you sure want to delete this venue?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: deleteHandler,
      },
    ]);
  };

  const navigateToOrderReview = () => {
    nav.navigate("OrderReviewScreen", {
      orders: orders,
      nameVenue: venueData?.name,
      pricePerHour: venueData?.price_per_hour,
    });
  };

  if (loading) return <LoadingOverlay />;

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
    admin_username: venueData?.admin_username,
  };

  const reservastionData = {
    name: venueData?.name,
    fieldsData: fieldsData,
    category: venueData?.Sport_Kind_Name.toLowerCase(),
    time_open: venueData?.time_open,
    time_closed: venueData?.time_closed,
    pricePerHour: venueData?.price_per_hour,
    orders: orders,
    setOrders: setOrders,
    setForceRefresh: setForceRefresh,
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
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        {
          <AlbumContent
            albumData={albumData}
            editMode={isAdmin}
            updateAlbumData={updateAlbumData}
            idVenue={idVenue}
          />
        }

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
      {orders?.length > 0 && (
        <View
          style={{
            marginTop: 12,
            paddingHorizontal: 25,
            width: "100%",
            position: "absolute",
            bottom: 20,
          }}
        >
          {!isAdmin && <Button onPress={navigateToOrderReview}>Order</Button>}
        </View>
      )}
      {editMode && (
        <BottomActionLayout>
          <View style={manageStyles.container}>
            <Pressable
              onPress={alertDeleteConfirmation}
              style={({ pressed }) => [
                manageStyles.button,
                { backgroundColor: COLOR.accent1 },
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={manageStyles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable
              onPress={NavigateToEdit}
              style={({ pressed }) => [
                manageStyles.button,
                pressed && { opacity: 0.7 },
              ]}
            >
              <Text style={manageStyles.buttonText}>Edit</Text>
            </Pressable>
          </View>
        </BottomActionLayout>
      )}
    </>
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

const manageStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flexDirection: "row",
    columnGap: 14,
  },
  button: {
    backgroundColor: COLOR.accent2,
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonText: {
    fontFamily: LEXEND.SemiBold,
    fontSize: 18,
    color: "white",
  },
});
