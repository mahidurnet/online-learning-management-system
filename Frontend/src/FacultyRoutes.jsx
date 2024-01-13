import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const FacultyRoutes = () => {
  const isAuthenticated = useSelector((state) => state.faculty.faculty);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default FacultyRoutes;
