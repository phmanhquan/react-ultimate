import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </Provider>
);
