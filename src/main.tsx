import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  </Provider>
);
