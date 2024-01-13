import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const StudentPrivateRoutes = () => {
  const isAuthenticated = useSelector((state) => state.student.student);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
export default StudentPrivateRoutes;