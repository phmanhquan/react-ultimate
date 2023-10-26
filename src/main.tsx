import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout.tsx";
import "nprogress/nprogress.css";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Layout />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
