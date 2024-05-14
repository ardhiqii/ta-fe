import React, { useContext, useEffect, useState } from "react";
import GroupContentLayout from "./GroupContentLayout";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import CardVeneu from "@components/CardVeneu";
import SwipeableContent from "./SwipeableContent";
import { Text, View } from "react-native";

const Nearest = () => {
  const [nearestData, setNearestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, getCurrentCoorUser, updateCoordinate } =
    useContext(UserContext);

  const fetchData = async () => {
    setLoading(true);
    let coor = user.coordinate;
    if (user.coordinate === "") {
      try {
        coor = await getCurrentCoorUser();
      } catch (e) {
        console.log("Error occured in fetch data Nearest.jsx", e);
      }
    }
    const coorfilter = `${coor.lat}, ${coor.lng}`;
    const filter = {
      is_car_parking: null,
      is_bike_parking: null,
      name: null,
      sort_by: "distance",
      Sport_Kind_id: null,
      coordinate: coorfilter,
    };
    try {
      const { data } = await Player.SportVenue.getAllVenue(
        user.token,
        filter
      );
      setNearestData(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [user.coordinate]);
  if (loading) {
    return (
      <GroupContentLayout title={"Nearest"}>
        <View>
          <Text>LOADING</Text>
        </View>
      </GroupContentLayout>
    );
  }
  return (
    <GroupContentLayout title={"Nearest"}>
      <SwipeableContent
        data={nearestData}
        renderItem={NearestRender}
        gap={20}
      />
    </GroupContentLayout>
  );
};

export default Nearest;

const NearestRender = ({ item }) => {
  return <CardVeneu {...item} />;
};
