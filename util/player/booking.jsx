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

const getAllOrdersByStatus = async (token, status) => {
  const url = process.env.BASE_URL + "/player/reservation/" + status;
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
      console.log("Error occured in util Booking, getAllOrdersByStatus", e);
    }
  }
};

const getAllJoinedReservationByStatus = async (token, sportKindId) => {
  const url =
    process.env.BASE_URL + "/player/reservation/joined/" + sportKindId;
  console.log(url);
  try {
    console.log("MASJ");
    const { data } = await axios.get(url, {
      headers: {
        token: token,
      },
    });

    console.log(data);
    if (data) {
      return data;
    }
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log(
        "Error occured in util Booking, getAllJoinedReservationByStatus",
        e
      );
    }
  }
};

const getOrderById = async (token, idReservation) => {
  const url =
    process.env.BASE_URL + "/player/reservation/details/" + idReservation;
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
      console.log("Error occured in util Booking, getOrderById", e);
    }
  }
};

const getMembersById = async (token, idReservation) => {
  const url =
    process.env.BASE_URL + "/player/reservation/members/" + idReservation;
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
      console.log("Error occured in util Booking, getMembersById", e);
    }
  }
};

const addMemberByUsername = async (token, idReservation, username) => {
  const url =
    process.env.BASE_URL +
    `/player/reservation/invite/${idReservation}/${username}`;
  try {
    const { data } = await axios.post(
      url,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log("Error occured in util Booking, addMemberByUsername", e);
    }
  }
};

const removeMemberByUsername = async (token, idReservation, username) => {
  const url =
    process.env.BASE_URL +
    `/player/reservation/kick/${idReservation}/${username}`;
  try {
    const { data } = await axios.delete(
      url,

      {
        headers: {
          token: token,
        },
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log("Error occured in util Booking, removeMemberByUsername", e);
    }
  }
};

const changeStatusOpenMember = async (token, idReservation, isOpenMember) => {
  const url =
    process.env.BASE_URL +
    `/player/reservation/open/${idReservation}/${isOpenMember}`;
  try {
    const data = await axios.put(
      url,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return data;
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log("Error occured in util Booking, changeStatusOpenMember", e);
    }
  }
};

const uploadPayment = async (token, idReservation, formData) => {
  const url =
    process.env.BASE_URL + `/player/reservation/upload/${idReservation}`;
  try {
    const { data } = await axios.post(url, formData, {
      headers: {
        token: token,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log("Error occured in util Booking, uploadPayment", e);
    }
    console.log(e.response);
  }
};

const cancelReservation = async (token, idReservation) => {
  const url =
    process.env.BASE_URL + `/player/reservation/cancel/${idReservation}`;
  try {
    const { data } = await axios.put(
      url,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return data;
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log("Error occured in util Booking, cancelReservation", e);
    }
    console.log(e.response);
  }
};

export const Booking = {
  newOrder,
  getAllOrdersByStatus,
  getOrderById,
  getMembersById,
  addMemberByUsername,
  removeMemberByUsername,
  changeStatusOpenMember,
  uploadPayment,
  cancelReservation,
  getAllJoinedReservationByStatus,
};
