const GOOGLE_API_KEY = "HEHEHEHEGKMAUNYOBACREDITLAGI";
const GEOAPIFY_API_KEY = `4887bbf51ad64ea99d71b17f4d41e4ae`;
import React from "react";

import { Alert, Pressable, Text, View } from "react-native";

const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&height=200&center=lonlat:${lng},${lat}&zoom=17&apiKey=${GEOAPIFY_API_KEY}`;
  return imagePreviewUrl;
};

const getAddress = async (lat, lng) => {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${GEOAPIFY_API_KEY}`;
  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      return "Failed to fetch address"
    }

    const data = await resp.json();
    const address = data.results[0].formatted;
    return address;
  } catch (e) {
    console.log(e);
  }
};

export const Location = {
  getAddress,
};
