import './EditProductDetailsForm.scss';

import {
  EditProductSchema,
  editProductSchema,
} from '../../../types/schemas/edit-product-schema';
import React, { useEffect } from 'react';

import { IProduct } from '../../../types/products/product.interface';
import { IProductCategory } from '../../../types/products/product-category.interface';
import { PRODUCTS_URL_PREFIX } from '../../../constants/api.constants';
import { transformProductToEditSchema } from '../../../utils/transformProduct';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUpdateProductMutation } from '../../../services/productAPI';
import { zodResolver } from '@hookform/resolvers/zod';

type EditProductDetailsProps = {
  product: IProduct;
  availableCategories: IProductCategory[] | undefined;
  toggleIsEditing: () => void;
};

export const EditProductForm: React.FC<EditProductDetailsProps> = ({
  product,
  availableCategories,
  toggleIsEditing,
}) => {
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: transformProductToEditSchema(product),
  });

  const handleUpdateProduct = async (data: EditProductSchema) => {
    const selectedCategory = availableCategories?.find(
      (category) => category.id === data.categoryId
    );
    if (!selectedCategory) {
      return;
    }

    const updatedData = {
      ...data,
      category: selectedCategory,
    };

    const updatedProduct = await updateProduct(updatedData);
    toggleIsEditing();

    if (updatedProduct) {
      navigate(`${PRODUCTS_URL_PREFIX}/${data.id}`);
    }
  };

  const handleCancelEdit = () => {
    reset(transformProductToEditSchema(product));
    toggleIsEditing();
  };

  useEffect(() => {
    if (product) {
      reset(transformProductToEditSchema(product));
    }
  }, [product, reset]);

  return (
    <form onSubmit={handleSubmit(handleUpdateProduct)}>
      <input type="hidden" {...register('id')} />
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="error-message">{errors.price.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          id="weight"
          {...register('weight', { valueAsNumber: true })}
        />
        {errors.weight && (
          <p className="error-message">{errors.weight.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select id="categoryId" {...register('categoryId')}>
          <option value="">Select a category</option>
          {availableCategories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="error-message">{errors.categoryId.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" {...register('imageUrl')} />
        {errors.imageUrl && (
          <p className="error-message">{errors.imageUrl.message}</p>
        )}
      </div>
      <div className="btn-group">
        <button type="submit" className="btn btn-save">
          Save
        </button>
        <button
          type="button"
          className="btn btn-cancel"
          onClick={handleCancelEdit}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
