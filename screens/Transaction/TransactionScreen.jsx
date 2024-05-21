import Filter from "@components/Search/Filter";
import CardOrder from "@components/Transaction/CardOrder";
import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { CATEGORY_ID } from "constant/CATEGORY_ID";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";

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

const ROLE_Filter = {
  label: "role",
  items: ["host", "member"],
};

const CATEGORY_FILTER = {
  label: "category",
  items: [
    "futsal",
    "basket",
    "badminton",
    "volley",
    "swimming",
    "bowling",
    "tennis",
  ],
};

const TransactionScreen = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [status, setStatus] = useState("all");
  const [roleFilter, setRoleFilter] = useState("host");
  const [categoryFilter, setCategoryFilter] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    setLoading(true);
    const cat =
      categoryFilter !== null && categoryFilter !== undefined
        ? CATEGORY_ID[categoryFilter]
        : "all";
    const stat = status !== null ? status: 'all'
    try {
      const { data } =
        roleFilter === "host"
          ? await Player.Booking.getAllOrdersByStatus(
              user.token,
              FormattedStatus(stat)
            )
          : await Player.Booking.getAllJoinedReservationByStatus(
              user.token,
              cat
            );
      if (data) {
        setTransactionData(data);
      }
    } catch (e) {
      console.log(e);
      if (e.data === null) {
        setTransactionData([]);
      }
    }
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [status, categoryFilter, roleFilter]);

  // if (loading) {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // }
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
        <View style={{ flexDirection: "row", columnGap: 12 }}>
          {roleFilter === "host" && (
            <Filter {...STATUS_FILTER} value={status} onUpdate={setStatus} />
          )}
          {roleFilter === "member" && (
            <Filter
              {...CATEGORY_FILTER}
              value={categoryFilter}
              onUpdate={setCategoryFilter}
            />
          )}
          <Filter
            {...ROLE_Filter}
            value={roleFilter}
            onUpdate={setRoleFilter}
          />
        </View>
      </View>
      {loading && <Text>LOADING</Text>}
      {transactionData?.length === 0 && (
        <Text
          style={{
            fontFamily: LEXEND.SemiBold,
            fontSize: 14,
            textAlign: "center",
            color: COLOR.border,
          }}
        >
          There is no transaction
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
            {transactionData?.map((t) => (
              <CardOrder data={t} key={t.reservation_id} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 12,
  },
  contentContainer: {
    paddingBottom: 80,
    paddingHorizontal: 25,
  },
});

const FormattedStatus = (status) => {
  let formatted = status.toLowerCase();
  formatted = formatted.split(" ");
  formatted = formatted.join("_");
  return formatted;
};
