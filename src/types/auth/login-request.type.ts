import { ICustomer } from '../customers/customer.interface';

export type LoginRequest = Pick<ICustomer, 'emailAddress'> & { password: string };
