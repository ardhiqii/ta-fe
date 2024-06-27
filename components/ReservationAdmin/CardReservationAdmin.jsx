import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Currency } from "util/currency";
import { Ionicons } from "@expo/vector-icons";
import { Admin } from "util/admin/admin";
import { UserContext } from "store/user-contex";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "@components/LoadingOverlay";

const CardReservationAdmin = ({
  id,
  name,
  price_per_hour,
  Sport_Kind_Name,
  is_public,
}) => {
  const [imageUri, setImageUri] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/203/055/non_2x/isometric-soccer-stadium-vector.png"
  );
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const nav = useNavigation();

  const fetchAlbumData = async () => {
    try {
      const { data } = await Admin.SportVenue.getAlbumVenuById(user.token, id);
      if (data.length > 0) {
        setImageUri(data[0].url);
      }
    } catch (e) {
      console.log("Error occured fetchAlbum SportVenueScreen", e);
      return null;
    }
  };

  const fetchVenueOrder = async () => {
    try {
      const { data } = await Admin.Booking.getReservationByIdVenueAndStatus(
        user.token,
        id,
        "all"
      );
      if (data) {
        setOrders(data);
      }
    } catch (e) {
      console.log("error fetchVenueOrder", e);
    }
  };

  const initData = async () => {
    setLoading(true);
    const resp = await Promise.all([fetchVenueOrder(), fetchAlbumData()]);
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  const navigatetoById = () => {
    nav.navigate("ReservationAdminNavigation", {
      screen: "ReservationByIdVenueScreen",
      params: {
        ordersData: orders,
        idVenue: id,
        imageUri: imageUri,
      },
    });
  };
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <Pressable onPress={navigatetoById}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", columnGap: 8 }}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: imageUri,
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={[styles.text]}>{name}</Text>
              <Text
                style={[
                  styles.text,
                  { fontFamily: LEXEND.SemiBold, color: COLOR.base900 },
                ]}
              >
                Rp.{Currency.format(price_per_hour)}
              </Text>
            </View>
            <View></View>
            <View style={{ flexDirection: "row" }}>
              <TagCategory category={Sport_Kind_Name.toLowerCase()} />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 4,
          }}
        >
          <Ionicons name="receipt-sharp" size={20} color={COLOR.border} />
          <Text style={{ fontFamily: LEXEND.Regular }}>{orders?.length}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CardReservationAdmin;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
    height: 100,
  },
  imageContainer: {
    borderWidth: 1,
    color: COLOR.second300,
    width: 112,
    height: 107,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  infoContainer: {
    justifyContent: "center",
    rowGap: 6,
  },
  text: {
    fontFamily: LEXEND.Light,
    color: COLOR.second900,
    fontSize: 12,
  },
});
