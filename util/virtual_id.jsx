import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
const getLocal = async () => {
  try {
    const virtualId = await AsyncStorage.getItem("virtual-id");
    return virtualId;
  } catch (e) {
    console.log("Error occured on getLocal virtual id", e);
  }
};

const storeLocal = async (virtualId) => {
  try {
    await AsyncStorage.setItem("virtual-id", virtualId);
  } catch (e) {
    console.log("Error occured on storeLocal virtual id", e);
  }
};

const removeLocal = async () => {
  try {
    await AsyncStorage.removeItem("virtual-id");
  } catch (e) {
    console.log("Error occured on removeLocal virtual id", e);
  }
};

const getVirtualId = async () => {
  try {
    url = process.env.BASE_URL + "/device/register";
    const {data} = await axios.post(url)
    console.log(data);
    return data
  } catch (e) {
    console.log(e);
  }
};

export const virtualId = {
  getLocal,
  storeLocal,
  removeLocal,
  getVirtualId
};
