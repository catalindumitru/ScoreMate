import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/ScorePage.css";
import { getScore } from "../database/accessor";
import { USERNAME } from "../auth/user";

function ScorePage() {
  const { opponent } = useParams();
  const sessionScore = JSON.parse(sessionStorage.getItem("score"));
  const [score, setScore] = useState(
    sessionScore ? sessionScore[opponent] : {}
  );

  useEffect(() => {
    if (!sessionScore || !sessionScore[opponent]) {
      getScore(opponent).then((data) => {
        console.log(data);
        if (data["user1"] !== USERNAME) {
          [data["score1"], data["score2"]] = [data["score2"], data["score1"]];
          [data["user1"], data["user2"]] = [data["user2"], data["user1"]];
        }
        sessionStorage.setItem(
          "score",
          JSON.stringify({
            ...sessionScore,
            [opponent]: data,
          })
        );
        setScore(data);
      });
    }
  }, [opponent, sessionScore]);

  return (
    score && (
      <div className="score-page">
        <div className="score">
          <span className="username">{score["user1"]}</span>
          {score["score1"]}
        </div>
        <div className="dash">-</div>
        <div className="score">
          {score["score2"]}
          <span className="username">{score["user2"]}</span>
        </div>
      </div>
    )
  );
}

export default ScorePage;
