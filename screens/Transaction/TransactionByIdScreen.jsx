import LoadingOverlay from "@components/LoadingOverlay";
import HeadContent from "@components/SportVenue/HeadContent";
import InformationContent from "@components/SportVenue/InformationContent";
import BottomAction from "@components/Transaction/BottomAction";
import DisplayQRModal from "@components/Transaction/DisplayQRModal";

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

const temp = {
  info: {
    booking_status: "waiting_approval",
    created_at: "2024-05-14 15:14:50",
    field_id: "8566b135-d791-4da4-a86d-3a8ddb147f7e",
    field_number: 6,
    host_name: "wakacipuyp",
    is_open_member: 1,
    is_public: 1,
    mabar_name: "TEST",
    playing_date: "2024-05-16",
    reservation_id: "33237c46-d455-4600-8092-2b1a45828507",
    sport_kind_id: "2b607252-3c94-432f-9275-a86304363cf3",
    sport_kind_name: "Badminton",
    time_end: "10:00:00",
    time_start: "9:00:00",
    total_price: 37500,
    venue_id: "d28aa20b-d982-4b53-b56d-7307a4410339",
    venue_name: "Gor Gokil",
  },
  role: "host",
};

const TransactionByIdScreen = () => {
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const idReservation = route?.params?.idReservation;
  const idVenue = route?.params?.idVenue;
  const [transactionData, setTransactionData] = useState();
  const [venueData, setVenueData] = useState();
  const [members, setMembers] = useState([]);

  const [forceRefresh, setForceRefresh] = useState(false);

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

  const fetchMemberData = async () => {
    try {
      const { data } = await Player.Booking.getMembersById(
        user.token,
        idReservation
      );
      return data;
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    const [td, vd, md] = await Promise.all([
      fetchData(),
      fetchVenueData(),
      fetchMemberData(),
    ]);
    setTransactionData(td);
    setVenueData(vd);
    setMembers(md);
    setLoading(false);
  };

  const forceRefreshData = async () => {
    const [td, vd, md] = await Promise.all([
      fetchData(),
      fetchVenueData(),
      fetchMemberData(),
    ]);
    setTransactionData(td);
    setVenueData(vd);
    setMembers(md);
    setForceRefresh(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    if (forceRefresh) {
      forceRefreshData()
    }
  }, [forceRefresh]);

  const onRefresh = useCallback(() => {
    forceRefreshData();
  }, []);

  if (loading) {
    return <LoadingOverlay />;
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
    isReservationPublic: transactionData?.info?.is_public,
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
    membersData: members,
    setForceRefresh: setForceRefresh,
  };

  const bottomActionData = {
    isOpenMember: transactionData?.info?.is_open_member,
    bookingStatus: transactionData?.info?.booking_status,
    totalPrice: transactionData?.info?.total_price,
    roleReviewer: transactionData?.role,
    token: user?.token,
    idReservation: idReservation,
    registered: isRegisteredAsMember(members, user?.username),
    setForceRefresh: setForceRefresh,
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
      {forceRefresh && <LoadingOverlay/>}
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

const isRegisteredAsMember = (members, username) => {
  const included = members.filter((m) => {
    if (m.username === username) {
      return true;
    }
  });
  return included.length === 1;
};
