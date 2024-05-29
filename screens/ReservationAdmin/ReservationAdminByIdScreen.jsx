import BottomActionAdmin from "@components/ReservationAdmin/BottomActionAdmin";
import MatchReservation from "@components/ReservationAdmin/MatchReservation";
import PaymentContent from "@components/ReservationAdmin/PaymentContent";
import HeadContent from "@components/SportVenue/HeadContent";
import { LEXEND } from "@fonts/LEXEND";
import { useRoute } from "@react-navigation/native";
import { COLOR } from "COLOR";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Admin } from "util/admin/admin";

const temp = {
  booking_creation_age_hour: 199,
  booking_status: "waiting_approval",
  created_at: "2024-05-14 15:14:50",
  field_id: "8566b135-d791-4da4-a86d-3a8ddb147f7e",
  field_number: 6,
  host_name: "wakacipuyp",
  mabar_name: "TEST",
  payment_credential_url:
    "http://rofif.my.id/static/pic_source/payments/wakacipuyp_33237c46-d455-4600-8092-2b1a45828507_214559804.jpeg",
  playing_date: "2024-05-16",
  reservation_id: "33237c46-d455-4600-8092-2b1a45828507",
  sport_kind_id: "2b607252-3c94-432f-9275-a86304363cf3",
  sport_kind_name: "Badminton",
  time_end: "10:00:00",
  time_start: "9:00:00",
  total_price: 37500,
  upload_payment_timestamp: "2024-05-21 21:45:59",
  venue_id: "d28aa20b-d982-4b53-b56d-7307a4410339",
  venue_name: "Gor Gokil",
};

const ReservationAdminByIdScreen = () => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({});

  const { user } = useContext(UserContext);
  const route = useRoute();
  const idReservation = route?.params?.idReservation;


  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await Admin.Booking.getReservationById(
        user?.token,
        idReservation
      );
      if (data) {
        setOrderData(data);
      }
    } catch (e) {
      console.log("Error fetchData ReservationAdminByIdScreen", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (forceRefresh) {
      setForceRefresh(false);
      fetchData();
    }
  }, [forceRefresh]);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const headData = {
    name: orderData?.venue_name,
    category: orderData?.sport_kind_name,
    field_number: orderData?.field_number,
  };

  const matchData = {
    hostName: orderData?.host_name,
    mabarName: orderData?.mabar_name,
    date: orderData?.playing_date,
    timeStart: orderData?.time_start,
    timeEnd: orderData?.time_end,
    idReservation: orderData?.reservation_id,
  };

  const bottomActionData = {
    bookingStatus: orderData?.booking_status,
    totalPrice: orderData?.total_price,
    token: user?.token,
    idReservation: orderData?.reservation_id,
    setForceRefresh: setForceRefresh
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <HeadContent {...headData} />
        <BorderLine />
        <MatchReservation {...matchData} />
        <BorderLine />
        <PaymentContent payment_credential_url={temp.payment_credential_url} />
      </ScrollView>
      <BottomActionAdmin {...bottomActionData} />
    </>
  );
};

export default ReservationAdminByIdScreen;

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    marginTop: 12,
  },
  subText: { color: COLOR.base900, fontFamily: LEXEND.SemiBold, fontSize: 12 },
  text: {
    fontFamily: LEXEND.Regular,
    fontSize: 12,
    color: COLOR.second700,
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
