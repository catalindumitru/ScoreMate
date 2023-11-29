const dev = process.env.NODE_ENV === "development";
const URL = dev ? "http://127.0.0.1:8000" : "https://score-mate.onrender.com";

const getOpponents = async (user) => {
  const res = await fetch(`${URL}/getOpponents?user=${user}`, {
    method: "GET",
  });

  return res.json();
};

const getScore = async (user1, user2) => {
  const res = await fetch(`${URL}/getScore?user1=${user1}&user2=${user2}`, {
    method: "GET",
  });

  return res.json();
};

const updateScore = async (user1, user2, target, operation) => {
  const res = await fetch(`${URL}/updateScore`, {
    method: "POST",
    body: JSON.stringify({
      user1,
      user2,
      target,
      operation,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return res.json();
};

export { getOpponents, getScore, updateScore };
