import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLOR } from "COLOR";
import TagCategory from "@components/TagCategory";
import { LEXEND } from "@fonts/LEXEND";
import { useNavigation } from "@react-navigation/native";
import { Admin } from "util/admin/admin";
import { Currency } from "util/currency";
import { UserContext } from "store/user-contex";

const Card = ({ id, name, price_per_hour, Sport_Kind_Name, is_public }) => {
  const [imageUri, setImageUri] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/203/055/non_2x/isometric-soccer-stadium-vector.png"
  );
  const nav = useNavigation();
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    fetchAlbumData();
    fetchVenueOrder();
  }, []);

  const navigateHandler = async () => {
    nav.navigate("SportVenueNavigation", {
      screen: "ManageSportVenueAdmin",
      params: {
        idVenue: id,
        editMode: true,
      },
    });
  };
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
  return (
    <Pressable style={styles.container} onPress={navigateHandler}>
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
          <View style={{ flexDirection: "row", marginBottom: 4 }}>
            <TagCategory category={Sport_Kind_Name.toLowerCase()} />
          </View>
          <View style={styles.ordersContainer}>
            <Text style={styles.text}>Order : {orders?.length}</Text>
            <Pressable
              onPress={navigatetoById}
              style={({ pressed }) => [
                styles.button,
                pressed && { opacity: 0.7, backgroundColor: "#7676764e" },
              ]}
            >
              <Text
                style={{
                  fontFamily: LEXEND.Regular,
                  fontSize: 12,
                  color: COLOR.base900,
                }}
              >
                Check Order
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
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
    width: "65%",
  },
  text: {
    fontFamily: LEXEND.Light,
    color: COLOR.second900,
    fontSize: 12,
  },

  ordersContainer: {
    borderTopWidth: 1,
    borderColor: "#cecece",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
  },
  button: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    borderColor: COLOR.base900,
  },
});
