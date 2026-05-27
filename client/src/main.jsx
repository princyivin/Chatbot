import React from "react";

import ReactDOM
  from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  GoogleOAuthProvider,
} from "@react-oauth/google";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(

  <React.StrictMode>

    <GoogleOAuthProvider
      clientId="14635593971-g4nifj5n96spjf79h3nnklb46tpe1lkd.apps.googleusercontent.com"
    >

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </GoogleOAuthProvider>

  </React.StrictMode>

);