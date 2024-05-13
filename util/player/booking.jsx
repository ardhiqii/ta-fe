import axios, { Axios } from "axios";

const newOrder = async (token, reqBody) => {
  const url = process.env.BASE_URL + "/player/reservation";
  try {
    const { data } = await axios.post(url, reqBody, {
      headers: {
        token: token,
      },
    });
    if (data) {
      console.log(data);
      return data;
    }
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      return e.response.data;
    } else {
      console.log("Error occured in util Booking, newOrder", e);
    }
  }
};

export const Booking = {
  newOrder,
};
