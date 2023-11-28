import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import MainPage from "./components/MainPage";
import ScorePage from "./components/ScorePage";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/score/:opponent" element={<ScorePage />} />
      </Routes>
    </Router>
  </ChakraProvider>
  // </React.StrictMode>
);
