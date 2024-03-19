import axios from "axios";

const getById = async (token, idVenue) => {
  const url = process.env.BASE_URL + "/admin/sportVenue";
  try {
    const { data } = await axios.get(url, {
      headers: {
        token: token,
        ["Sport-Venue-id"]: idVenue,
      },
    });
    // console.log("util sport venue");
    // console.log(data);
    return data;
  } catch (e) {
    console.log("Error occured in util sportVenue", e);
  }
};

export const SportVenue = {
  getById,
};
