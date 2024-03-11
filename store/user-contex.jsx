import { createContext, useState } from "react";
import { Token } from "util/token";

export const UserContext = createContext({
  user:{},
  updateUser: ()=>{},
});

const UserContextProvider = ({ children }) => {
  const [dataUser,setDataUser] = useState({})
  
  const updateUser = async (data)=>{
    setDataUser(data);
    await Token.storeLocal(data.token)
  }

  const value ={
    user:dataUser,
    updateUser:updateUser
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserContextProvider;
