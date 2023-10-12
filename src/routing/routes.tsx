import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../components/User/User";
import Admin from "../components/Admin/Admin";
import HomePage from "../components/Home/HomePage";
import DashBoard from "../components/Admin/Content/DashBoard";
import ManageUser from "../components/Admin/Content/ManageUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage></HomePage> },
      { path: "users", element: <User></User> },
    ],
  },
  {
    path: "admins",
    element: <Admin></Admin>,
    children: [
      { index: true, element: <DashBoard></DashBoard> },
      { path: "manage-users", element: <ManageUser></ManageUser> },
    ],
  },
]);

export default router;
