import { createContext, useState } from "react";
import { Token } from "util/token";

export const UserContext = createContext({
  user: {},
  updateUser: () => {},
  updateCoordinate: () => {},
});


const defaultData ={
  ava_url: "",
  name: "",
  phone: "",
  token: "",
  username: "",
  role:"",
  coordinate:"",
}
const UserContextProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState(defaultData);

  const updateUser = async (data) => {
    setDataUser(data);
    await Token.storeLocal(data.token);
  };

  const updateCoordinate = async (coor) =>{
    setDataUser((prev)=>{
      return {
        ...prev,"coordinate":coor
      }
    })
  }

  const value = {
    user: dataUser,
    updateUser: updateUser,
    updateCoordinate:updateCoordinate
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
