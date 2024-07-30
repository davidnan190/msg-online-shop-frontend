import { IOrderDetail } from "./order-detail.interface";

export interface IOrder {
  id: string;
  country: string;
  city: string;
  customerId: string;
  county: string;
  streetAddress: string;
  createdAt: Date;
  orderDetails: IOrderDetail[];
}
