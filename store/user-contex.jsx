import { createContext, useState } from "react";
import { Token } from "util/token";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  requestForegroundPermissionsAsync,
  useForegroundPermissions,
} from "expo-location";
import { Alert } from "react-native";
import { Role } from "util/role";

export const UserContext = createContext({
  user: {},
  updateUser: () => {},
  updateCoordinate: () => {},
  updateWithCertainType: (type,value) => {},
  getCurrentCoorUser: () => string,
  logoutUser: () => {},
});

const defaultData = {
  ava_url: "",
  name: "",
  phone: "",
  token: "",
  username: "",
  role: "",
  coordinate: "",
};
const UserContextProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState(defaultData);
  const [locationPermissionInfomation, requestPermission] =
    useForegroundPermissions();

  const updateUser = async (data) => {
    setDataUser(data);
    await Token.storeLocal(data.token);
  };

  const updateCoordinate = async (coor) => {
    setDataUser((prev) => {
      return {
        ...prev,
        coordinate: coor,
      };
    });
  };

  const updateWithCertainType = async (type, value) => {
    setDataUser((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const logoutUser = async () => {
    await Token.removeLocal();
    await Role.removeLocal();
    setDataUser(null);
  };

  const getCurrentCoorUser = async () => {
    const verifyPermissions = async () => {
      if (
        locationPermissionInfomation.status === PermissionStatus.UNDETERMINED
      ) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }

      if (locationPermissionInfomation.status === PermissionStatus.DENIED) {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Insufficinet Permissions!",
            "Please grant location permission and turn on GPS"
          );
        } else {
          getCurrentCoorUser();
        }

        return false;
      }

      return true;
    };
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return;
      }
      const location = await getCurrentPositionAsync();
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      const coor = {
        lat,
        lng,
      };
      updateCoordinate(coor);
      return coor;

      // console.log(location);
      // console.log(address);
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    user: dataUser,
    updateUser: updateUser,
    updateCoordinate: updateCoordinate,
    updateWithCertainType: updateWithCertainType,
    getCurrentCoorUser: getCurrentCoorUser,
    logoutUser: logoutUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

// const userDataFromAPI = {
//   ava_url: "",
//   name: "",
//   phone: "",
//   token: "",
//   username: "",
// };
