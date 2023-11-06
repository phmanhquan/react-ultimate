import { useSelector } from "react-redux";
import { UserState } from "../redux/reducer/userReducer";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const userState = useSelector<{ user: UserState }, UserState>(
    (state) => state?.user
  );

  if (!userState?.isAuthenticated) {
    return <Navigate to="/login"></Navigate>;
  }
  return <>{children}</>;
};

export default PrivateRoute;
