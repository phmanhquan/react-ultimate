import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../components/User/User";
import Admin from "../components/Admin/Admin";
import HomePage from "../components/Home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage></HomePage> },
      { path: "users", element: <User></User> },
      { path: "admins", element: <Admin></Admin> },
    ],
  },
]);

export default router;
