import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Our owned Win95 foundation (canonical palette, metrics, bevels, fonts,
// scrollbars) before app-level globals so the desktop background wins.
import "./win95/theme.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
