import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const location = useLocation();
  const { accessToken } = useAuthContext()

  console.log(accessToken)

  return accessToken ? (

    <Outlet />
  ) : (
    <Navigate to={'/login'} replace state={{ from: location }} />
  );
};

export default ProtectedRoute;