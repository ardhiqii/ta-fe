import HeadContent from "@components/SportVenue/HeadContent";
import InformationContent from "@components/SportVenue/InformationContent";
import BottomAction from "@components/Transaction/BottomAction";

import ListMembers from "@components/Transaction/ListMembers";
import MatchInformation from "@components/Transaction/MatchInformation";
import { useRoute } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";

const TransactionByIdScreen = () => {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const idReservation = route?.params?.idReservation;
  const idVenue = route?.params?.idVenue;
  const [transactionData, setTransactionData] = useState();
  const [venueData, setVenueData] = useState();
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    if (idReservation) {
      try {
        const { data } = await Player.Booking.getOrderById(
          user.token,
          idReservation
        );
        return data;
      } catch (e) {
        return null;
      }
    }
  };

  const fetchVenueData = async () => {
    if (idVenue) {
      try {
        const coordinate = `${user?.coordinate?.lat}, ${user?.coordinate?.lng} `;
        const { data } = await Player.SportVenue.getById(
          user.token,
          idVenue,
          coordinate
        );
        return data;
      } catch (e) {
        return null;
      }
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    const [td, vd] = await Promise.all([fetchData(), fetchVenueData()]);
    setTransactionData(td);
    setVenueData(vd);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const onRefresh = useCallback(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const headData = {
    name: transactionData?.info?.venue_name,
    category: transactionData?.info?.sport_kind_name,
    field_number: transactionData?.info?.field_number,
  };

  const infoData = {
    description: venueData?.description,
    geo_coordinate: venueData?.geo_coordinate,
    is_bike_parking: venueData?.is_bike_parking,
    is_car_parking: venueData?.is_car_parking,
    is_public: venueData?.is_public,
    rules: venueData?.rules,
  };

  const matchData = {
    isOpenMember: transactionData?.info?.is_open_member,
    timeStart: transactionData?.info?.time_start,
    timeEnd: transactionData?.info.time_end,
    date: transactionData?.info?.playing_date,
    roleReviewer: transactionData?.role,
    token: user?.token,
    idReservation: idReservation,
  };
  const listMembersData = {
    idReservation: idReservation,
    roleReviewer: transactionData?.role,
  };

  const bottomActionData = {
    bookingStatus: transactionData?.info?.booking_status,
    totalPrice: transactionData?.info?.total_price,
    roleReviewer: transactionData?.role,
    token: user?.token,
    idReservation: idReservation,
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://www.datra.id/uploads/project/50/gor-citra-bandung-c915x455px.png",
            }}
            style={styles.image}
          />
        </View>
        <HeadContent {...headData} />
        <BorderLine />
        <MatchInformation {...matchData} />
        <BorderLine />
        <InformationContent {...infoData} />
        <BorderLine />
        <ListMembers {...listMembersData} />
      </ScrollView>
      <BottomAction {...bottomActionData} />
    </>
  );
};

export default TransactionByIdScreen;

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
