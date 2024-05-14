import axios from "axios";
import { Token } from "util/token";
import { virtualId } from "util/virtual_id";

export const login = async (username, password, role) => {
  const virtual_device_id = await virtualId.getLocal();
  const url_login = process.env.BASE_URL + `/${role}/auth/login`;
  try {
    const { data } = await axios.post(url_login, {
      username: username,
      password: password,
      virtual_device_id: virtual_device_id,
    });
    console.log("LOGIN FUNCTION");
    console.log(data);
    Token.storeLocal(data.data.token);
    return data;
  } catch (e) {
    console.log("Error Message: ", e);
    console.log(e.response.data);
    return e.response.data;
  }
};

export const register = async (name, username, password, phone, role) => {
  const url_register = process.env.BASE_URL + `/${role}/auth/register`;

  const bodyData = {
    username: username,
    password: password,
    name: name,
  };
  if (role === "admin") {
    bodyData["phone"] = phone;
  }
  console.log("CALLED REGISTER UTIL");
  try {
    const { data } = await axios.post(url_register, bodyData);
    console.log("register function", data);
    return data;
  } catch (e) {
    console.log("Error Message: ", e);
  }
};

export const relogin = async (token, role) => {
  const url_relogin = process.env.BASE_URL + `/auth/relogin`;
  try {
    const { data } = await axios.get(url_relogin, {
      headers: {
        token: token,
      },
    });
    if (data) {
      if (!data.relogin_status) {
        return null;
      }
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};
