import axios, { Axios } from "axios";

const getReservationByIdVenueAndStatus = async (token, idVenue, status) => {
  const url = process.env.BASE_URL + `/admin/reservation/${idVenue}/${status}`;
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
      console.log("Error occured in util getReservationByIdVenueAndStatus", e);
    }
  }
};


const getReservationById = async (token, idReservation) => {
  const url = process.env.BASE_URL + `/admin/reservation/detail/${idReservation}`;

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
      console.log("Error occured in util getReservationById", e);
    }
  }
};


const editStatusReservation = async (token, idReservation, status) => {
  const url = process.env.BASE_URL + `/admin/reservation/status`;
  try {
    const { data } = await axios.put(
      url,
      {"reservation_id": idReservation,
        "status":status
      },
      {
        headers: {
          token: token,
        },
      }
    );
    if (data) {
      return data;
    }
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      return e.response.data;
    } else {
      console.log("Error occured in util editStatusReservation", e);
    }
  }
};

export const Booking = {
  getReservationByIdVenueAndStatus,
  getReservationById,
  editStatusReservation
};
