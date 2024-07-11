import axios, { Axios } from "axios";

const x = axios.create({
  baseURL: process.env.BASE_URL + "/user-info",
  timeout: 5000,
});

const getInfoOtherUsername = async (token, toUsername) => {
  const url = `/${toUsername}`;
  try {
    const { data } = await x.get(url, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log(error);
  }
};

const editUserInfo = async (
  token,
  username = null,
  name = null,
  phone = null
) => {
  const url = ``;
  const updateUser = {
    username,
    phone,
    name,
  };
  try {
    const { data } = await x.put(url, updateUser, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log(error);
  }
};

const updatePhotoProfile = async (token, formData) => {
  const url = "/ava";
  try {
    const { data } = await x.post(url, formData, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    if (data) {
      return data;
    }
  } catch (e) {
    console.log("ERROR updatePhotoProfile", e);
    console.log(e.response.data);
    throw Error(e)
  }
};

export const Profile = {
  getInfoOtherUsername,
  editUserInfo,
  updatePhotoProfile,
};
