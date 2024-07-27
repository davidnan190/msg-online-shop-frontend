import { ICustomer } from '../interfaces/customer/customer.interface';
import { Role } from '../enums/role.enum';

export const customerMock: ICustomer = {
  id: '1',
  firstName: 'mock',
  lastName: 'customer',
  username: 'mock',
  emailAddress: 'asdasd@asd.com',
  imageUrl: 'https://via.placeholder.com/480',
  role: Role.ADMIN,
};
