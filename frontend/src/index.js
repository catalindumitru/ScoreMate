import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import MainPage from "./components/MainPage";
import ScorePage from "./components/ScorePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route exact path="/" element={<MainPage />} />
      <Route path="/score/:opponent" element={<ScorePage />} />
    </Routes>
  </Router>
  // </React.StrictMode>
);
