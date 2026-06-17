import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// React95 base styles + theme tokens, before our own index.css so site-level
// overrides (desktop background) win on source order. We deliberately do NOT
// import "@react95/icons/icons.css": that's a ~3.6 MB sheet of base64 PNGs for
// the CSS-class icon API, but we use the React icon components, which inline
// their own SVG and need no stylesheet.
import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
