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


const getAllPublicReservations = async (token, coordinate,sportKindId,mabarType,sortBy) => {
  const url = process.env.BASE_URL + `/player/reservation/public/${sportKindId}/${mabarType}/${sortBy}` ;
  try {
    const { data } = await axios.get(url, {
      headers: {
        token: token,
        geo_coordinate: coordinate
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
      console.log("Error occured in util Booking, getAllPublicReservations", e);
    }
  }
};

const getAllJoinedReservationByStatus = async (token, sportKindId) => {
  const url =
    process.env.BASE_URL + "/player/reservation/joined/" + sportKindId;
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
    console.log("Error occured getAllJoinedReservationByStatus", e);
    throw e.response.data;
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

const leaveReservation = async (token, idReservation) => {
  const url =
    process.env.BASE_URL + `/player/reservation/leave/${idReservation}`;
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
      console.log("Error occured in util Booking, leaveReservation", e);
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

const changeStatusPublicReservation = async (
  token,
  idReservation,
  isPublic
) => {
  const url =
    process.env.BASE_URL +
    `/player/reservation/public/${idReservation}/${isPublic}`;
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


const joinReservation = async (token, idReservation) => {
  const url =
    process.env.BASE_URL + `/player/reservation/join/${idReservation}`;
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
    return data;
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log("Error occured in util Booking, joinReservation", e);
    }
    console.log(e.response);
  }
};

const getReservationQR = async (token, idReservation) => {
  const url =
    process.env.BASE_URL + `/player/reservation/QR/${idReservation}`;
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
    return data;
  } catch (e) {
    // DOING THIS BECAUSE NOT GETTING RESPONSE BODY IN 404 STATUS
    if (e.response && e.response.data) {
      throw e.response.data;
    } else {
      console.log("Error occured in util Booking, getReservationQR", e);
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
  joinReservation,
  getAllJoinedReservationByStatus,
  leaveReservation,
  changeStatusPublicReservation,
  getAllPublicReservations,
  getReservationQR
};
