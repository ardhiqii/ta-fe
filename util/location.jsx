const GOOGLE_API_KEY = "HEHEHEHEGKMAUNYOBACREDITLAGI";
const GEOAPIFY_API_KEY = `4887bbf51ad64ea99d71b17f4d41e4ae`;
import React from "react";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { Alert, Pressable, Text, View } from "react-native";

const getCurrent = async () => {
  

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
  try {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const location = await getCurrentPositionAsync();
    return location;
  } catch (e) {
    console.log(e);
  }
};

const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=200&center=lonlat:${lng},${lat}&zoom=17&apiKey=${GEOAPIFY_API_KEY}`;
  return imagePreviewUrl;
};

const getAddress = async (lat, lng) => {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${GEOAPIFY_API_KEY}`;

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await resp.json();
  const address = data.results[0].formatted;
  return address;
};

export const Location = {
  getAddress,
};
