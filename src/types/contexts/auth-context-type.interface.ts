import { ICustomer } from '../customers/customer.interface';
import { Role } from '../../enums/role.enum';

export interface IAuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isCustomer: () => boolean;
  isAdmin: () => boolean;
  retrieveLoggedInUser: () => ICustomer | null;
  userRole: Role | null;
  login: (
    accessToken: string,
    refreshToken: string,
    loggedInUser: ICustomer
  ) => void;
  logout: () => void;
}
