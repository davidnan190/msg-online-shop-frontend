import { ICustomer } from '../customers/customer.interface';

export interface IAuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isCustomer: () => boolean;
  isAdmin: () => boolean;
  loggedInUserId: string | null;
  userRole: string | null;
  login: (
    accessToken: string,
    refreshToken: string,
    loggedInUser: ICustomer
  ) => void;
  logout: () => void;
}
