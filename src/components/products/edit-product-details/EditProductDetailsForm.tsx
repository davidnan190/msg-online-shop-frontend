import './EditProductDetailsForm.scss';

import { IProduct } from '../../../types/products/product.interface';
import { IProductCategory } from '../../../types/products/product-category.interface';
import { PRODUCTS_URL_PREFIX } from '../../../constants/api.constants';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUpdateProduct } from '../../../hooks/products/useUpdateProduct';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  price: z.number().min(1, 'Price must be positive'),
  weight: z.number().min(1, 'Weight must be positive'),
  imageUrl: z.string().url('Invalid URL').optional(),
  categoryId: z.string().min(1, 'Category is required'),
});

type FormData = z.infer<typeof schema>;

type Props = {
  product: IProduct;
  availableCategories: IProductCategory[] | undefined;
  toggleIsEditing: () => void;
};

export const EditProductForm: React.FC<Props> = ({
  product,
  availableCategories,
  toggleIsEditing,
}) => {
  const { updateProduct, isLoading, error } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product,
  });

  const navigate = useNavigate();

  const handleUpdateProduct = async (data: FormData) => {
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
    reset({ ...product, categoryId: product.category.id });
    toggleIsEditing();
  };

  useEffect(() => {
    if (product) {
      reset({ ...product, categoryId: product.category.id });
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
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default EditProductForm;
