import { Role } from '../enums/role.enum';

export const hasPermission = (userRole: Role | null, requiredRole: Role): boolean => {
  return userRole === requiredRole;
};
