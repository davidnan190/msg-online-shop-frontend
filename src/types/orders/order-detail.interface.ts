export interface IOrderDetail {
  id: string;
  product: { id: string; name: string; message: string };
  shippedFrom: { id: string; name: string };
  quantity: number;
}
