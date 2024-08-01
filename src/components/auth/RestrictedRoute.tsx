import { Outlet, useLocation } from 'react-router-dom';

import React from 'react';
import { Role } from '../../enums/role.enum';
import { hasPermission } from '../../utils/permissions.utils';
import { useAuthContext } from '../../context/AuthContext';

interface RestrictedRouteProps {
  requiredRole: Role;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({ requiredRole }) => {
  const location = useLocation();
  const { userRole } = useAuthContext();

  if (hasPermission(userRole, requiredRole)) {
    return <Outlet />;
  }

  return (
    <div>
      <p>Access to this page is denied due to lack of permissions.</p>
      <a href={location.state?.from || '/'}>Go back to the previous page</a>
    </div>
  );
};

export default RestrictedRoute;
