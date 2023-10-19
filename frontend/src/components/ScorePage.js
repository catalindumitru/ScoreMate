import React from "react";
import "../style/ScorePage.css";

function ScorePage() {
  // Sample scores and usernames (you can replace this with actual data)
  const player1Score = 5;
  const player2Score = 3;
  const player1Name = "dumikata3";
  const player2Name = "elanu2000";

  return (
    <div className="score-page">
      <div className="score">
        <span className="username">{player1Name}</span>
        {player1Score}
      </div>
      <div className="dash">-</div>
      <div className="score">
        {player2Score}
        <span className="username">{player2Name}</span>
      </div>
    </div>
  );
}

export default ScorePage;
