import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserByIdQuery } from "../core/services/user/user";
import { UserRoleEnum } from "../enums/Enum";

const ProtectedRoute = ({ allowedRoles }) => {
  const [cookies] = useCookies(["USER_ID"]);
  const userId = cookies.USER_ID || "";
  const { data: userData } = useGetUserByIdQuery({ userId });

  if (!userData) {
    return <div>Loading...</div>; // Show a loader or spinner while fetching user data
  }

  const userRole = userData.role;

  if (allowedRoles.includes(userRole)) {
    return <Outlet />; // The child routes will be rendered here if the user role is allowed
  } else {
    return <Navigate to="/" replace />; // Redirect to the login or home page if unauthorized
  }
};

export default ProtectedRoute;
