import './ProductDetailsPage.scss';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ILocation } from '../../types/locations/location.interface';
import { ProductDetailsActions } from '../../components/products/product-details-actions/ProductDetailsActions';
import { ProductDetailsImage } from '../../components/products/product-details-image/ProductDetailsImage';
import { ProductDetailsInfo } from '../../components/products/product-details-info/ProductDetailsInfo';
import { useCart } from '../../context/CartContext';
import { useDeleteProduct } from '../../hooks/products/useDeleteProduct';
import { useFetchLocations } from '../../hooks/locations/useFetchLocations';
import { useFetchProduct } from '../../hooks/products/useFetchProduct';
import { useForm } from 'react-hook-form';
import { useUpdateProduct } from '../../hooks/products/useUpdateProduct';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  weight: z.number().min(0, 'Weight must be positive'),
  imageUrl: z.string().url('Invalid URL').optional(),
});

type FormData = z.infer<typeof schema>;

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    product,
    isLoading: isFetchLoading,
    error: fetchError,
  } = useFetchProduct(productId || '');

  const { locations, error: locationsError } = useFetchLocations();

  const {
    deleteProduct,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteProduct();

  const {
    updateProduct,
    isLoading: isUpdateLoading,
    error: updateError,
  } = useUpdateProduct();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product,
  });

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  if (isFetchLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleDeleteProduct = async () => {
    if (productId) {
      await deleteProduct(productId);
      navigate('/products');
    }
  };

  const handleAddToCart = (quantity: number, location: ILocation) => {
    addToCart(product, quantity, location);
    navigate('/cart');
  };

  const onSubmit = async (data: FormData) => {
    await updateProduct(data);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    reset(product);
    setIsEditing(false);
  };

  return (
    <div className="product-details-page">
      <h1 className="page-headline">Product Details</h1>
      <div className="product-details-card">
        {!isEditing && <ProductDetailsImage imageUrl={product.imageUrl} />}
        <div className="product-info">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register('id')} />
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name')} />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
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
          ) : (
            <ProductDetailsInfo product={product} />
          )}
          {!isEditing && (
            <>
              <ProductDetailsActions
                onAddToCart={handleAddToCart}
                availableLocations={locations}
                onDeleteProduct={handleDeleteProduct}
                onEditProduct={() => setIsEditing(true)}
              />
              {/* <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
                Edit
              </button> */}
            </>
          )}
          {updateError && <div className="error-message">{updateError}</div>}
          {deleteError && <div className="error-message">{deleteError}</div>}
        </div>
      </div>
    </div>
  );
};
