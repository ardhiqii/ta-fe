import axios, { Axios } from "axios";

const x = axios.create({
  baseURL: process.env.BASE_URL,
});

const getInfoOtherUsername = async (token, toUsername) => {
  const url = `/user-info/${toUsername}`;
  try {
    const { data } = await x.get(url, {
      headers: {
        token: token,
      },
    });
    if(data) return data;
  } catch (error) {
    console.log(error);
  }
};


export const Profile = {
  getInfoOtherUsername
}