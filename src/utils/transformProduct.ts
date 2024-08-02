import { EditProductSchema } from "../types/schemas/edit-product-schema";
import { IProduct } from "../types/products/product.interface";

export const transformProductToEditSchema = (product: IProduct): EditProductSchema => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    weight: product.weight,
    imageUrl: product.imageUrl || '',
    categoryId: product.category.id,
  };
};