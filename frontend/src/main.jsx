import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./components/Theme/Theme.js";
import { TodoProvider } from "./components/Context/TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TodoProvider>
          <App />
        </TodoProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
