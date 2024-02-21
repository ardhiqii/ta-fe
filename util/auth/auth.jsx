import axios from "axios";

const url_login = process.env.BASE_URL + "/player/auth/login";
const url_register = process.env.BASE_URL + "/player/auth/register";
export const login = async (username, password) => {
  console.log("CALLED LOGIN UTIL");
  try {
    const { data } = await axios.post(url_login, {
      username: username,
      password: password,
    });
    return data;
  } catch (e) {
    console.log("Error Message: ", e);
  }
};

export const register = async (name,username, password) => {
  console.log("CALLED REGISTER UTIL");
  try {
    const { data } = await axios.post(url_register, {
      username: username,
      password: password,
      name: name,
    });
    console.log("register function",data);
    return data;
  } catch (e) {
    console.log("Error Message: ", e);
  }
};
