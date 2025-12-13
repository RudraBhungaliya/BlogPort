import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import BlogState from "./context/data/myState";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  console.error("VITE_GOOGLE_CLIENT_ID is missing! Check your .env file.");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BlogState>
        <App />
      </BlogState>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
