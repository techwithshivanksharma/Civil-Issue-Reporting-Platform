import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // import BrowserRouter
import App from "./App.jsx";
import { IssueProvider } from "./context/IssueContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <IssueProvider>
        <App />
      </IssueProvider>
    </BrowserRouter>
  </StrictMode>
);
