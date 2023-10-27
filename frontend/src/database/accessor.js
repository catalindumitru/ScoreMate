import { USERNAME } from "../auth/user";

const URL = "https://score-mate.onrender.com";

const getOpponents = () => {
  return fetch(`${URL}/getOpponents?user=${USERNAME}`, {
    method: "GET",
  }).then((res) => res.json());
};

const getScore = (opponent) => {
  return fetch(`${URL}/getScore?user1=${USERNAME}&user2=${opponent}`, {
    method: "GET",
  }).then((res) => res.json());
};

export { getOpponents, getScore };
