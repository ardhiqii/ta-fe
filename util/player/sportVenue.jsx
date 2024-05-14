import axios, { Axios } from "axios";

const getAllVenue = async (token, filter) => {
  const url = process.env.BASE_URL + "/player/sportVenue";
  console.log(token);
  console.log(filter);
  try {
    const { data } = await axios.post(url, filter, {
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
    const { data } = await axios.post(
      url,
      { coordinate: coordinate },
      {
        headers: {
          token: token,
        },
      }
    );
    return data;
  } catch (e) {
    console.log("Error occured in util sportVenue, getById", e);
    console.log(e.response.data);
    let message = e.response.data.message;
    message = message.split("is ")[1];
    return { data: message };
  }
};

const getAllFields = async (token, idVenue) => {
  const url = process.env.BASE_URL + "/player/sportVenue/fields/" + idVenue;
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
    console.log("Error occured in util sportVenue", e);
  }
};

const getBlacklistFieldById = async (token, idField, month, year) => {
  const url =
    process.env.BASE_URL +
    `/player/sportVenue/fields/schedule/blacklist/${idField}/${month}/${year}`;
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
    console.log("Error occured in util sportVenue, getBlackListFiedlById", e);
    return [];
  }
};

const getReservedFieldById = async (token, idField, month, year) => {
  const url =
    process.env.BASE_URL +
    `/player/sportVenue/fields/schedule/reservation/${idField}/${month}/${year}`;
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
    console.log("Error occured in util sportVenue, getReservedFieldById", e);
    return [];
  }
};

export const SportVenue = {
  getAllVenue,
  getById,
  getAllFields,
  getBlacklistFieldById,
  getReservedFieldById
};
