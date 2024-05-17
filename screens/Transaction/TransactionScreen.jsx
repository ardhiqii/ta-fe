import Filter from "@components/Search/Filter";
import CardOrder from "@components/Transaction/CardOrder";
import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
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
  label: "Status",
  items: [
    "All",
    "Payment",
    "Waiting Aprroval",
    "Approved",
    "Rejected",
    "Cancelled",
  ],
};

const TransactionScreen = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await Player.Booking.getAllOrdersByStatus(
        user.token,
        FormattedStatus(status)
      );
      setTransactionData(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [status]);

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
        <Filter {...STATUS_FILTER} value={status} onUpdate={setStatus} />
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
            {transactionData.map((t) => (
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
