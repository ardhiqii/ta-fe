import CardReservationAdmin from "@components/ReservationAdmin/CardReservationAdmin";
import React, { Fragment, useCallback, useContext, useEffect, useState } from "react";
import {  RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

import { UserContext } from "store/user-contex";
import { Admin } from "util/admin/admin";

const ReservationAdminScreen = () => {
  const { user } = useContext(UserContext);
  const [allVenueData, setAllVenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchVenueData = async () => {
    setLoading(true);
    try {
      const { data } = await Admin.SportVenue.getAllVenue(user.token);
      if (data) {
        setAllVenueData(data);
      }
    } catch (e) {
      console.log("error fetchVenueData", e);
      setAllVenueData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVenueData();
  }, []);

  const onRefresh = useCallback(() => {
    fetchVenueData();
  }, []);


  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh}/>}>
      {allVenueData?.map((v, i) => (
        <Fragment key={i}>
          <CardReservationAdmin {...v} key={v.id} />
          <View
            key={i + v.id + v.name}
            style={{ height: 2, backgroundColor: "#cfd8dc" }}
          />
        </Fragment>
      ))}
    </ScrollView>
  );
};

export default ReservationAdminScreen;

const styles = StyleSheet.create({
  container: { marginTop: 12, paddingBottom: 10, rowGap: 16 },
});
