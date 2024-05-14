import AsyncStorage from "@react-native-async-storage/async-storage";

const getLocal = async () => {
  try {
    const role = await AsyncStorage.getItem("role");
    return role;
  } catch (e) {}
};

const storeLocal = async (role) => {
  try {
    await AsyncStorage.setItem("role", role);
  } catch (e) {}
};

const removeLocal = async () => {
  try {
    await AsyncStorage.removeItem("role");
  } catch (e) {
    console.log(e);
  }
};

export const Role = {
  getLocal,
  storeLocal,
  removeLocal,
};
