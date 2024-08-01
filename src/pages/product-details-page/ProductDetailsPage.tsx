import './ProductDetailsPage.scss';

import {
  CART_URL_PREFIX,
  PRODUCTS_URL_PREFIX,
} from '../../constants/api.constants';
import { useNavigate, useParams } from 'react-router-dom';

import EditProductForm from '../../components/products/edit-product-details/EditProductDetailsForm';
import { ILocation } from '../../types/locations/location.interface';
import { ProductDetailsActions } from '../../components/products/product-details-actions/ProductDetailsActions';
import { ProductDetailsImage } from '../../components/products/product-details-image/ProductDetailsImage';
import { ProductDetailsInfo } from '../../components/products/product-details-info/ProductDetailsInfo';
import { useCart } from '../../context/CartContext';
import { useDeleteProduct } from '../../hooks/products/useDeleteProduct';
import { useFetchLocations } from '../../hooks/locations/useFetchLocations';
import { useFetchProduct } from '../../hooks/products/useFetchProduct';
import { useFetchProductCategories } from '../../hooks/categories/useFetchProductCategories';
import { useState } from 'react';

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

  const { categories, error: categoriesError } = useFetchProductCategories();

  const {
    deleteProduct,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteProduct();

  const toggleIsEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  const [isEditing, setIsEditing] = useState(false);

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
      navigate(PRODUCTS_URL_PREFIX);
    }
  };

  const handleAddToCart = (quantity: number, location: ILocation) => {
    addToCart(product, quantity, location);
    navigate(CART_URL_PREFIX);
  };

  return (
    <div className="product-details-page">
      <h1 className="page-headline">Product Details</h1>
      <div className="product-details-card">
        {!isEditing && <ProductDetailsImage imageUrl={product.imageUrl} />}
        <div className="product-info">
          {isEditing ? (
            <EditProductForm
              product={product}
              toggleIsEditing={toggleIsEditing}
              availableCategories={categories}
            />
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
            </>
          )}
          {deleteError && <div className="error-message">{deleteError}</div>}
        </div>
      </div>
    </div>
  );
};
