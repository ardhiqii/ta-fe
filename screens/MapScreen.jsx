import { useNavigation, useRoute } from "@react-navigation/native";
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { Alert, Pressable, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "store/user-contex";
const MapScreen = () => {
  const { user } = useContext(UserContext);
  const [selectedLocation, setSelectedLocation] = useState();
  const nav = useNavigation();
  const route = useRoute();
  const type = route.params?.type;
  const region = {
    latitude: user?.coordinate.lat ? user?.coordinate.lat : -6.882773,
    longitude: user?.coordinate.lng ? user?.coordinate.lng : 107.612015,
    latitudeDelta: 0.0091,
    longitudeDelta: 0.0092,
  };

  const selectLocationHandler = (event) => {
    // if(initialLocation){
    //   return
    // }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked", "You have to pick a location");
      return;
    }
    console.log("CALLED SAVED LOCATION");
    console.log(selectedLocation);
    nav.navigate("SportVenueNavigation", {
      screen: "EditManageSportVenueAdmin",
      params: {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng,
        type: type,
      },
    });
  }, [nav, selectedLocation]);

  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: ({ tintColor }) => (
        <Pressable>
          <Ionicons
            name="save"
            size={24}
            color={tintColor}
            onPress={savePickedLocationHandler}
          />
        </Pressable>
      ),
    });
  }, [nav, savePickedLocationHandler]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      onPress={selectLocationHandler}
      showsMyLocationButton={true}
      showsUserLocation={true}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default MapScreen;
