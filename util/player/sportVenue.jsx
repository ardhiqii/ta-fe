import axios, { Axios } from "axios";

const getAllVenue = async (token) => {
  const url = process.env.BASE_URL + "/player/sportVenue";
  try {
    const { data } = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    if (data) {
      return data;
    }
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      return e.response.data;
    } else {
      console.log("Error occured in util sportVenue", e);
    }
  }
};

const getById = async (token, id, coordinate) => {
  const url = process.env.BASE_URL + "/player/sportVenue/" + id;

  try {
    const data = await axios.get(
      url,
      { coordinate: coordinate },
      {
        headers: {
          token: token,
        },
      }
    );
    // console.log("util sport venue");
    console.log(data);
    return data;
  } catch (e) {
    console.log("Error occured in util sportVenue", e);
    console.log(e.response.data);
  }
};

export const SportVenue = {
  getAllVenue,
  getById,
};
