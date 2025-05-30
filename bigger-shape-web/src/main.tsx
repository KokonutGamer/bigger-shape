// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import "./index.css";
import SurveyPage from "./SurveyPage";
import HomePage from "./HomePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Survey" element={<SurveyPage />} />
        <Route path="/dashboard" element={<ProfilePage />} />
        <Route path="/" element={<HomePage  />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
