import axios, { Axios } from "axios";

const x = axios.create({
  baseURL: process.env.BASE_URL + `/player/reservation/match-history`,
});

const getAllMatchHistories = async (token, idReservation) => {
  const url = `/${idReservation}`;
  try {
    const { data } = await x.get(url, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR getAllMatchHistories", error);
  }
};

const getMatchHistory = async (token, idReservation, idMatchHistory) => {
  const url = `/${idReservation}/${idMatchHistory}`;
  try {
    const { data } = await x.get(url, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR getMatchHistory", error);
  }
};

const createMatch = async (token, reqBody) => {
  try {
    const { data } = await x.post("", reqBody, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR createMatch", error);
  }
};

const deleteMatch = async (token, reqBody) => {
  try {
    const { data } = await x.delete("", {
      data: reqBody,
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR deleteMatch", error);
    console.log(error.response.data);
  }
};

const updateScore = async (
  token,
  idReservation,
  idMatchHistory,
  scoreA,
  scoreB
) => {
  try {
    const reqBody = {
      reservation_id: idReservation,
      match_history_id: idMatchHistory,
      score_a: scoreA,
      score_b: scoreB,
    };
    const { data } = await x.put("/score", reqBody, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR updateScore", error);
  }
};

const addPlayerToTeam = async (
  token,
  idReservation,
  idMatchHistory,
  username,
  team
) => {
  try {
    const reqBody = {
      reservation_id: idReservation,
      match_history_id: idMatchHistory,
      username,
      team,
    };
    const { data } = await x.post("/player", reqBody, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR addPlayerToTeam", error);
  }
};

const removePlayerFromTeam = async (
  token,
  idReservation,
  idMatchHistory,
  username
) => {
  try {
    const reqBody = {
      reservation_id: idReservation,
      match_history_id: idMatchHistory,
      username,
    };
    const { data } = await x.delete("/player", {
      data: reqBody,
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR removePlayerFromTeam", error);
    console.log(error.response.data);
  }
};

const updateStatusDoneMatch = async (
  token,
  idReservation,
  idMatchHistory,
  done
) => {
  try {
    const reqBody = {
      reservation_id: idReservation,
      match_history_id: idMatchHistory,
      is_done: done,
    };
    const { data } = await x.put("/is_done", reqBody, {
      headers: {
        token: token,
      },
    });
    if (data) return data;
  } catch (error) {
    console.log("ERROR updateStatusDoneMatch", error);
  }
};

export const Match = {
  getAllMatchHistories,
  createMatch,
  getMatchHistory,
  updateScore,
  deleteMatch,
  addPlayerToTeam,
  removePlayerFromTeam,
  updateStatusDoneMatch,
};
