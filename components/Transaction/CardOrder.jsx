import TagCategory from "@components/TagCategory";
import { COLOR } from "COLOR";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LEXEND } from "@fonts/LEXEND";

const CardOrder = ({ data }) => {
  const timeStart = data.time_start.slice(0, -3);
  const timeEnd = data.time_end.slice(0, -3);
  const bookingStatus =
    data.booking_status.charAt(0).toUpperCase() + data.booking_status.slice(1);
  return (
    <Pressable style={styles.container}>
      {/* ### Header ### */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderColor: COLOR.border,
          paddingHorizontal: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <View>
          <View style={{ flexDirection: "row", columnGap: 4 }}>
            <Text style={{ fontFamily: LEXEND.Regular }}>
              {data.venue_name}
            </Text>
            <TagCategory category={data.sport_kind_name} />
          </View>
          <Text style={{ fontFamily: LEXEND.Light, fontSize: 11 }}>
            {data.playing_date}
          </Text>
        </View>
        <Text style={{ fontFamily: LEXEND.Regular }}>{bookingStatus}</Text>
      </View>
      {/* ### Information ### */}
      <View style={{ paddingHorizontal: 10, paddingVertical: 10, rowGap: 8 }}>
        <View
          style={{ flexDirection: "row", columnGap: 8, alignItems: "center" }}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://www.datra.id/uploads/project/50/gor-citra-bandung-c915x455px.png",
              }}
              style={styles.image}
            />
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View style={{ rowGap: 2 }}>
              <Text style={{ fontFamily: LEXEND.Regular, fontSize: 12 }}>
                {data.mabar_name}
              </Text>
              <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>
                Field {data.field_number}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TimeDisplay item={`${timeStart} - ${timeEnd}`} />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                columnGap: 4,
                alignItems: "center",
              }}
            >
              <FontAwesome5 name={"user-friends"} color={COLOR.border} />
              <Text style={{ fontFamily: LEXEND.Light, fontSize: 12 }}>
                {data.count_member}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardOrder;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLOR.border,
    paddingTop: 12,
    paddingBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    borderWidth: 1,
    color: COLOR.second300,
    width: 75,
    height: 75,
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
});

const TimeDisplay = ({ item }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderColor: COLOR.border,
      }}
    >
      <Text
        style={{
          fontFamily: LEXEND.Light,
          fontSize: 11,
        }}
      >
        {item}
      </Text>
    </View>
  );
};
