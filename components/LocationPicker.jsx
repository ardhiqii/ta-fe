import React from "react";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { Alert, Pressable, Text, View } from "react-native";
import { Location } from "util/location";
const LocationPicker = () => {
  const [locationPermissionInfomation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (locationPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInfomation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficinet Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  };

  const getLocationHandler = async ()=>{
    const hasPermission = await verifyPermissions();
    if(!hasPermission) return

    const location = await getCurrentPositionAsync();
    const lat = location.coords.latitude
    const lng = location.coords.longitude

    const address = await Location.getAddress(lat,lng)
  }

  return <View>
    <Pressable onPress={getLocationHandler}>
      <Text>Loc</Text>
    </Pressable>
  </View>
};


export default LocationPicker;
