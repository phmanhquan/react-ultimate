import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../components/User/User";
import Admin from "../components/Admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // errorElement: <ErrorPage />,
    children: [
      // { index: true, element: <App></App> },
      { path: "user", element: <User></User> },
      { path: "admin", element: <Admin></Admin> },
    ],
  },
]);

export default router;
