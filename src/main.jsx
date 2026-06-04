import { createRoot } from "react-dom/client";
import React from "react";
const App = React.lazy(() => import("./App.jsx"));
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
