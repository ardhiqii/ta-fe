import axios, { Axios } from "axios";

const getAllVenue = async (token) => {
  const url = process.env.BASE_URL + "/admin/sportVenue";
  console.log(token);
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

const getById = async (token, id) => {
  const url = process.env.BASE_URL + "/admin/sportVenue/" + id;
  try {
    const { data } = await axios.get(url, {
      headers: {
        token: token,
      },
    });
    // console.log("util sport venue");
    return data;
  } catch (e) {
    console.log("Error occured in util sportVenue", e);
    console.log(e.response.data);
  }
};

const editVenue = async (token, dataVenue) => {
  const url = process.env.BASE_URL + "/admin/sportVenue/edit";

  try {
    const { data } = await axios.put(url, dataVenue, {
      headers: {
        token: token,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const addVenue = async (token, dataVenue) => {
  const url = process.env.BASE_URL + "/admin/sportVenue/register";

  try {
    const { data } = await axios.post(url, dataVenue, {
      headers: {
        token: token,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

const deleteVenue = async (token, id) => {
  const url = process.env.BASE_URL + "/admin/sportVenue/" + id;
  try {
    const { data } = await axios.delete(url, {
      headers: {
        token: token,
      },
    });
    // console.log("util sport venue");
    return data;
  } catch (e) {
    console.log("Error occured in util sportVenue", e);
  }
};

const getAllFields = async (token, idVenue) => {
  const url = process.env.BASE_URL + "/admin/sportVenue/fields/" + idVenue;
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

const deleteFieldById = async (token, idVenue, idField) => {
  const url = process.env.BASE_URL + "/admin/sportVenue/fields/delete";
  const reqBody = {
    Sport_Venue_id: idVenue,
    field_id: idField,
  };

  try {
    const { data } = await axios.delete(url, {
      data: reqBody,
      headers: {
        token: token,
      },
    });
    if (data) {
      return data;
    }
  } catch (e) {
    console.log("Error occured in util sportVenue deleteFieldById", e);
  }
};

const addNewField = async (token, idVenue, number) => {
  const url = process.env.BASE_URL + "/admin/sportVenue/fields/add";

  const reqBody = {
    Sport_Venue_id: idVenue,
    field_number: number,
  };
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
    console.log("Error occured in util sportVenue addNewField", e);
    console.log(e.response.data);
  }
};

const getBlacklistFieldById = async (token, idField, month, year) => {
  const url =
    process.env.BASE_URL +
    `/admin/sportVenue/fields/schedule/blacklist/${idField}/${month}/${year}`;
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
    return []
  }
};

const addBlacklistScheduleByFieldId = async (token, reqBody) => {
  const url =
    process.env.BASE_URL + "/admin/sportVenue/fields/schedule/blacklist";

  try {
    const { data } = await axios.post(url, reqBody, {
      headers: {
        token: token,
      },
    });
    return data;
  } catch (e) {
    console.log(
      "Error occured in util sportvenue, addBlacklistScheduleByFieldId",
      e
    );
  }
};

const deleteBlacklistScheduleByFieldId = async (token, idBlacklist) => {
  const url =
    process.env.BASE_URL + "/admin/sportVenue/fields/schedule/blacklist";
  console.log(idBlacklist);
  const reqBody = {
    blacklist_id: idBlacklist,
  };

  try {
    const { data } = await axios.delete(url, {
      data: reqBody,
      headers: {
        token: token,
      },
    });
    if (data) {
      return data;
    }
  } catch (e) {
    console.log(
      "Error occured in util sportVenue deleteBlacklistScheduleByFieldId",
      e
    );
  }
};
export const SportVenue = {
  getAllVenue,
  getById,
  editVenue,
  addVenue,
  deleteVenue,
  getAllFields,
  deleteFieldById,
  addNewField,
  getBlacklistFieldById,
  addBlacklistScheduleByFieldId,
  deleteBlacklistScheduleByFieldId,
};
