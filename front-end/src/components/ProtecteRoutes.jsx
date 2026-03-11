import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const localUserInfo = localStorage.getItem("userInfo")
  return userInfo && localUserInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;