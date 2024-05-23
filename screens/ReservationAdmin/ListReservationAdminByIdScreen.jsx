import Filter from "@components/Search/Filter";
import CardOrder from "@components/Transaction/CardOrder";
import { LEXEND } from "@fonts/LEXEND";
import { useRoute } from "@react-navigation/native";
import { COLOR } from "COLOR";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Admin } from "util/admin/admin";

const STATUS_FILTER = {
  label: "status",
  items: [
    "all",
    "payment",
    "waiting_approval",
    "approved",
    "rejected",
    "cancelled",
  ],
};

const ListReservationAdminByIdScreen = () => {
  const route = useRoute();
  const idVenue = route?.params?.idVenue;
  const routeOrdersData = route?.params?.ordersData;

  const [ordersData, setOrdersData] = useState(routeOrdersData);
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(()=>{
    fetchData()
  },[status])

  const fetchData = async () => {
    const stat = status !== null ? status : "all";
    setLoading(true);
    try {
      const { data } = await Admin.Booking.getReservationByIdVenueAndStatus(
        user.token,
        idVenue,
        stat
      );
      setOrdersData(data)
    } catch (e) {
      console.log("fetchData ListReservationAdminByIdScreen", e);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingBottom: 10,
          borderBottomWidth: 1,
          paddingHorizontal: 25,
          borderColor: COLOR.border,
          position: "relative",
          zIndex: 4,
        }}
      >
        <Filter {...STATUS_FILTER} onUpdate={setStatus} value={status} />
      </View>
      {loading && <Text>LOADING</Text>}
      {!loading && ordersData?.length === 0 && (
        <Text
          style={{
            fontFamily: LEXEND.SemiBold,
            fontSize: 14,
            textAlign: "center",
            color: COLOR.border,
          }}
        >
          There is no reservation
        </Text>
      )}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {!loading && ordersData.map((o) => {
          return <CardOrder data={o} key={o.reservation_id} role={"admin"} />;
        })}
      </ScrollView>
    </View>
  );
};

export default ListReservationAdminByIdScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 12,
  },
  contentContainer: {
    paddingHorizontal: 25,
    rowGap: 20,
    paddingTop: 12,
    paddingBottom: 80,
  },
});
