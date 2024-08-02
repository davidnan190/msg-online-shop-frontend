import { ICustomer } from '../customers/customer.interface';
import { ITokens } from './tokens.interface';

export interface LoginResponse {
  customer: ICustomer;
  tokens: ITokens;
}
