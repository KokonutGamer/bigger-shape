// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import "./index.css";
import SurveyPage from "./SurveyPage";
import HomePage from "./HomePage";
import { AuthProvider } from "./AuthContext";

import AboutUsPage from "./AboutUsPage";

import CreateAccountPage from "./CreateAccountPage";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Survey" element={<SurveyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<CreateAccountPage />} />
          <Route path="/dashboard" element={<ProfilePage />} />
          <Route path="AboutUs" element={<AboutUsPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
