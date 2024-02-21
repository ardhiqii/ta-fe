import { createContext, useState } from "react";

export const UserContext = createContext({
  user:{},
  updateUser: ()=>{},
});

const UserContextProvider = ({ children }) => {
  const [dataUser,setDataUser] = useState({})
  
  const updateUser = (data)=>{
    console.log("IN USERCONTEXT");
    console.log(data);
    setDataUser(data);
  }

  const value ={
    user:dataUser,
    updateUser:updateUser
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserContextProvider;
