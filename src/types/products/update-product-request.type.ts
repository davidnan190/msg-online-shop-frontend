import { IProduct } from "../../types/products/product.interface";

export type UpdateProductRequest = Partial<IProduct> & { id: string}