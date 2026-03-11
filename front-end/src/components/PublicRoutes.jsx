import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;