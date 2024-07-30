import { Role } from "../../enums/role.enum";

export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  imageUrl: string;
  role: Role;
}
