import LoadingOverlay from "@components/LoadingOverlay";
import FieldOrder from "@components/SportVenue/Order/FieldOrder";
import OrderContent from "@components/SportVenue/Order/OrderContent";
import TimeDisplay from "@components/SportVenue/TimeDisplay";
import Button from "@components/UI/Button";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOR } from "COLOR";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Currency } from "util/currency";
import { Player } from "util/player/player";

const OrderReviewScreen = () => {
  const route = useRoute();
  const nav = useNavigation();
  const ordersRoute = route?.params?.orders;
  const nameVenue = route?.params?.nameVenue;
  const price = route?.params?.pricePerHour;

  const [orders, setOrders] = useState(
    ordersRoute?.length === 0 ? [] : ordersRoute
  );
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let totalHour = 0;
    orders.map((o) => {
      o.fieldsData.map((f) => {
        totalHour = totalHour + f.selected.length;
      });
    });
    setTotalPrice(totalHour * price);
  }, []);

  useEffect(() => {
    // console.log(JSON.stringify(orders,null,2));
  }, [orders]);

  const updateFieldsData = (date, idField, identifier, value) => {
    setOrders((prev) => {
      return prev.map((o) => {
        if (o.date == date) {
          const updatedFieldsData = o.fieldsData.map((f) => {
            if (f.id === idField) {
              return { ...f, [identifier]: value };
            }
            return f;
          });
          return { ...o, fieldsData: updatedFieldsData };
        }
        return o;
      });
    });
  };

  const applyForAllFields = (date, idField, identifier) => {
    let value = "";
    const listField = [];
    orders.map((o) => {
      if (o.date == date) {
        o.fieldsData.map((f) => {
          if (f.id == idField) {
            value = f[identifier];
          } else {
            listField.push(f.id);
          }
        });
      }
    });
    listField.map((f) => {
      updateFieldsData(date, f, identifier, value);
    });
  };

  const confirmHandler = async () => {
    setLoading(true);
    const currentOrder = [];
    orders.map((o) => {
      const date = o.date;
      o.fieldsData.map((f) => {
        let times = f.selected.sort(customSort);
        times = mergeTime(times);
        times.map((t) => {
          const split = t.split(" - ");
          const time_start = split[0] + ":00";
          const time_end = split[1] + ":00";

          const order = {
            date: date,
            field_id: f.id,
            name: f.name,
            mabar_type: f.match_type,
            time_start,
            time_end,
          };
          currentOrder.push(order);
        });
      });
    });

    try {
      const arrayPomise = [];
      currentOrder.map((c) => {
        arrayPomise.push(Player.Booking.newOrder(TOKEN_TEMPORARY, c));
      });

      const resp = await Promise.all(arrayPomise);
      nav.navigate("BottomTabNavigator", {
        screen: "HomeScreen",
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {orders.map((o, i) => (
          <OrderContent
            key={o.date + i}
            {...o}
            updateFieldsData={updateFieldsData}
            nameVenue={nameVenue}
            applyForAllFields={applyForAllFields}
          />
        ))}
      </ScrollView>
      <View style={styles.button}>
        <Text style={{ fontFamily: LEXEND.Light }}>
          Total Price:<Text style={{fontFamily:LEXEND.Regular}}> Rp.{Currency.format(totalPrice)}</Text>
        </Text>
        <View style={{ width: "100%" }}>
          <Button onPress={confirmHandler}>Confirm</Button>
        </View>
      </View>
      {loading && <LoadingOverlay />}
    </>
  );
};

export default OrderReviewScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    rowGap: 12,
    paddingHorizontal: 25,
    paddingBottom: 150,
  },
  button: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: 110,
    backgroundColor: "white",
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderColor: COLOR.border,
    paddingVertical: 8,
    rowGap: 12,
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

const mergeTime = (times) => {
  let mergedSlots = [];
  let startTime = null;
  let endTime = null;
  for (let time of times) {
    const splitted = time.split(" - ");
    if (startTime === null) {
      startTime = splitted[0];
      endTime = splitted[1];
    } else if (endTime == splitted[0]) {
      endTime = splitted[1];
    } else {
      mergedSlots.push(`${startTime} - ${endTime}`);
      startTime = splitted[0];
      endTime = splitted[1];
    }
  }
  if (startTime !== null) {
    mergedSlots.push(`${startTime} - ${endTime}`);
  }

  return mergedSlots;
};

const customSort = (a, b) => {
  const startTimeA = a.split(" - ")[0];
  const startTimeB = b.split(" - ")[0];
  if (startTimeA < startTimeB) return -1;
  if (startTimeA > startTimeB) return 1;
  return 0;
};
