// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage";
import "./index.css";
import SurveyPage from "./SurveyPage";
import HomePage from "./HomePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Survey" element={<SurveyPage />} />
        <Route path="/HomePage" element={<HomePage  />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
