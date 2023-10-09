// src/components/MainPage.js
import React, { useState } from "react";

function MainPage() {
  // Example state to track game scores between people
  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
  });

  // Function to update scores
  const updateScore = (player) => {
    setScores((prevScores) => ({
      ...prevScores,
      [player]: prevScores[player] + 1,
    }));
  };

  return (
    <div className="main-page">
      <h1>Game Score Tracker</h1>
      <div className="scoreboard">
        <div className="player">
          <h2>Player 1</h2>
          <p>Score: {scores.player1}</p>
          <button onClick={() => updateScore("player1")}>Add Point</button>
        </div>
        <div className="player">
          <h2>Player 2</h2>
          <p>Score: {scores.player2}</p>
          <button onClick={() => updateScore("player2")}>Add Point</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
