import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Layout from "./Layout.tsx";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "yet-another-react-lightbox/styles.css";
import "./utils/i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Layout />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
