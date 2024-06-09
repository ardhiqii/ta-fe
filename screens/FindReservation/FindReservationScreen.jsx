import FiltersFindReservation from "@components/FindReservation/FiltersFindReservation";
import CardOrder from "@components/Transaction/CardOrder";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { CATEGORY_ID } from "constant/CATEGORY_ID";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";

const FindReservationScreen = () => {
  const [filters, setFilters] = useState({
    category: null,
    mabarType: null,
    sortBy: "distance",
  });
  const [reservationData, setReservationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  const fetchData = async () => {
    setLoading(true);
    const coor = user?.coordinate ? `${user.coordinate.lat}, ${user.coordinate.lng}` : "";
    const categoryFilter =
      filters.category !== null && filters.category !== undefined
        ? CATEGORY_ID[filters.category]
        : "all";
    const mabarFilter =
      filters.mabarType !== null && filters.mabarType !== undefined
        ? filters.mabarType
        : "all";
    try {
      const { data } = await Player.Booking.getAllPublicReservations(
        user.token,
        coor,
        categoryFilter,
        mabarFilter,
        filters.sortBy
      );
      if (data) {
        setReservationData(data);
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  const onRefresh = useCallback(()=>{
    fetchData();
  },[filters])

  useEffect(() => {
    fetchData();
  }, [filters]);

  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <FiltersFindReservation filters={filters} setFilters={setFilters} />
      </View>
      {loading && <Text>Loading</Text>}
      {!loading && reservationData?.length === 0 && (
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
      {!loading && (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
        >
          <View style={{ rowGap: 20 }}>
            {reservationData?.map((t) => (
              <CardOrder data={t} key={t.reservation_id} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default FindReservationScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 12,
  },
  filtersContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    borderColor: COLOR.border,
    position: "relative",
    zIndex: 4,
  },
  contentContainer: {
    paddingBottom: 80,
    paddingHorizontal: 25,
  },
});
