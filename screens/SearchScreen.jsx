import Card from "@components/Search/Card";
import Filters from "@components/Search/Filters";
import Header from "@components/Search/Header";
import { LEXEND } from "@fonts/LEXEND";
import { COLOR } from "COLOR";
import { TOKEN_TEMPORARY } from "constant/DUMMY_TOKEN";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { UserContext } from "store/user-contex";
import { Player } from "util/player/player";

const SearchScreen = () => {
  const { user } = useContext(UserContext);
  const coorUser = `${user.coordinate.lat},${user.coordinate.lng}`;

  const [filters, setFilters] = useState({
    is_car_parking: null,
    is_bike_parking: null,
    name: null,
    Sport_Kind_id: null,
    sort_by: "distance",
    coordinate: coorUser,
  });
  const [venueData, setVenueData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    if (!filters.coordinate) {
      return;
    }
    if (filters.name === "") {
      updateFilter("name", null);
    }
    try {
      const { data } = await Player.SportVenue.getAllVenue(
        user.token,
        filters
      );
      setVenueData(data);
    } catch (e) {
      console.log("Error Occured fetch data, SearchScreen", e);
    }
  };

  const updateFilter = (identifier, value) => {
    setFilters((prev) => {
      return { ...prev, [identifier]: value };
    });
  };

  return (
    <View style={{ rowGap: 12 }}>
      <Header updateFilter={updateFilter} name={filters.name} />
      <Filters updateFilter={updateFilter} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 25,
          rowGap: 20,
          flexGrow: 1,
          paddingBottom: 200,
        }}
      >
        {venueData.length === 0 && (
          <View>
            <Text
              style={{
                fontFamily: LEXEND.SemiBold,
                fontSize: 14,
                textAlign: "center",
                color: COLOR.border,
              }}
            >
              There is no any venue
            </Text>
          </View>
        )}
        {venueData?.map((v) => (
          <Card key={v.id} {...v} />
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
