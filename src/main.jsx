import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


// Bootstrap CSS harus di-load dulu
import "bootstrap/dist/css/bootstrap.min.css";

// Baru custom CSS override agar menang
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
