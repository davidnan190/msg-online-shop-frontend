import { IProduct } from "../../interfaces/product.interface";

export type UpdateProductRequest = Partial<IProduct> & { id: string}