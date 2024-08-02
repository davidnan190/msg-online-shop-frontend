import { ICustomer } from '../customers/customer.interface';
import { Role } from '../../enums/role.enum';

export type RegistrationRequest = {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  role: Role;
};
