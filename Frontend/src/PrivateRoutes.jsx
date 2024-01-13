import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = () => {
  const isAuthenticated = useSelector((state) => state.admin.admin);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
