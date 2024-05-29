import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import ScheduleContent from "./ScheduleContent";
import ListFieldsContent from "./ListFieldsContent";
import { TEMPORARY_ROLE } from "constant/DUMMY_ROLE";
import { Player } from "util/player/player";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import Button from "@components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "store/user-contex";
import { Admin } from "util/admin/admin";

const ReservationContent = ({
  name,
  fieldsData,
  category,
  time_open,
  time_closed,
  pricePerHour,
  orders,
  setOrders,
  setForceRefresh,
}) => {
  const [date, setDate] = useState();
  const [blacklist, setBlacklist] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const isAdmin = user.role === "admin";

  // useEffect(() => {
  //   console.log("CHECKING ORDER IN RESERVEATIONCONTENT");
  //   console.log("##### order", order);
  // }, [order]);

  const initData = async () => {
    setLoading(true);
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + 20);

      fieldsData.map(async (f) => {
        try {
          const idField = f.id;
          const [bl, r] = await Promise.all([
            fetchBlacklist(today, futureDate, idField),
            fetchReserved(today, futureDate, idField),
          ]);
          if (bl) {
            setBlacklist((prev) => {
              return { ...prev, [idField]: bl };
            });
          }
          if (r) {
            setReserved((prev) => {
              return { ...prev, [idField]: r };
            });
          }
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  const fetchBlacklist = async (today, futureDate, idField) => {
    const nowMonth = today.getMonth() + 1;
    const futureMonth = futureDate.getMonth() + 1;
    try {
      const playerPromises = [
        Player.SportVenue.getBlacklistFieldById(
          user.token,
          idField,
          nowMonth,
          today.getFullYear()
        ),
        Player.SportVenue.getBlacklistFieldById(
          user.token,
          idField,
          futureMonth,
          futureDate.getFullYear()
        ),
      ];

      const adminPromises = [
        Admin.SportVenue.getBlacklistFieldById(
          user.token,
          idField,
          nowMonth,
          today.getFullYear()
        ),
        Admin.SportVenue.getBlacklistFieldById(
          user.token,
          idField,
          futureMonth,
          futureDate.getFullYear()
        ),
      ];
      const data = isAdmin
        ? await Promise.all(adminPromises)
        : await Promise.all(playerPromises);
      const bl =
        nowMonth !== futureMonth
          ? data[0].data.concat(data[1].data)
          : data[0].data;
      return bl;
    } catch (e) {}
  };

  const fetchReserved = async (today, futureDate, idField) => {
    const nowMonth = today.getMonth() + 1;
    const futureMonth = futureDate.getMonth() + 1;

    const playerPromises = [
      Player.SportVenue.getReservedFieldById(
        user.token,
        idField,
        nowMonth,
        today.getFullYear()
      ),
      Player.SportVenue.getReservedFieldById(
        user.token,
        idField,
        futureMonth,
        futureDate.getFullYear()
      ),
    ];

    const adminPromises = [
      Admin.SportVenue.getReservedFieldById(
        user.token,
        idField,
        nowMonth,
        today.getFullYear()
      ),
      Admin.SportVenue.getReservedFieldById(
        user.token,
        idField,
        futureMonth,
        futureDate.getFullYear()
      ),
    ];
    try {
      const data = isAdmin
        ? await Promise.all(adminPromises)
        : await Promise.all(playerPromises);
      const bl =
        nowMonth !== futureMonth
          ? data[0].data.concat(data[1].data)
          : data[0].data;
      return bl;
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const orderHandler = (date, fieldsData) => {
    const newOrder = {
      date: date,
      fieldsData: fieldsData,
    };
    let isNewDate = true;
    let updateOrder = orders.map((o) => {
      if (o.date === date) {
        isNewDate = false;
        return { ...o, fieldsData: fieldsData };
      } else {
        return o;
      }
    });

    if (isNewDate) {
      updateOrder.push(newOrder);
    }
    updateOrder = updateOrder.filter((o) => o.fieldsData.length !== 0);
    setOrders(updateOrder);
  };

  return (
    <>
      <View style={{ rowGap: 12 }}>
        <ScheduleContent setDate={setDate} orderData={orders} />
        <BorderLine
          customStyle={{
            borderBottomWidth: 2,
            borderStyle: "dashed",
            paddingTop: 2,
          }}
        />
        <ListFieldsContent
          orderData={orders}
          defaultData={fieldsData}
          category={category}
          time_closed={time_closed}
          time_open={time_open}
          date={date}
          blacklistData={blacklist}
          reservedData={reserved}
          onChangeOrder={orderHandler}
          setForceRefresh={setForceRefresh}
        />
      </View>
    </>
  );
};

export default ReservationContent;

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
