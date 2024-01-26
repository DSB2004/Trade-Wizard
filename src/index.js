import "./styles/index.css";

// router import
import { BrowserRouter } from "react-router-dom";
import App from "./app";
// redux import

import store from "./hook/store";
import { Provider } from "react-redux";

//react import
import { createRoot } from "react-dom/client";
import React from "react";


createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);
