import { createBrowserRouter } from "react-router-dom";
import App from "../App";
// import User from "../components/User/User";
import Admin from "../components/Admin/Admin";
import HomePage from "../components/Home/HomePage";
import DashBoard from "../components/Admin/Content/DashBoard";
import ManageUser from "../components/Admin/Content/ManageUser";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import DetailQuiz from "../components/User/DetailQuiz";
import NotFound from "../components/NotFound";
import ManageQuiz from "../components/Admin/Content/Quiz/ManageQuiz";
import Questions from "../components/Admin/Content/Question/Questions";
import PrivateRoute from "./PrivateRoute";
import ListQuiz from "../components/User/ListQuiz";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage></HomePage> },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <ListQuiz />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "admins",
    element: (
      <PrivateRoute>
        <Admin></Admin>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashBoard></DashBoard> },
      { path: "manage-users", element: <ManageUser></ManageUser> },
      { path: "manage-quizzes", element: <ManageQuiz></ManageQuiz> },
      { path: "manage-questions", element: <Questions></Questions> },
    ],
  },
  { path: "login", element: <Login></Login> },
  { path: "register", element: <Register></Register> },
  { path: "quiz/:id", element: <DetailQuiz></DetailQuiz> },
  { path: "*", element: <NotFound></NotFound> },
]);

export default router;
