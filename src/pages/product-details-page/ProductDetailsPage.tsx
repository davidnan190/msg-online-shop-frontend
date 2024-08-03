import './ProductDetailsPage.scss';

import {
  CART_URL_PREFIX,
  PRODUCTS_URL_PREFIX,
} from '../../constants/api.constants';
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from '../../services/productAPI';
import { useNavigate, useParams } from 'react-router-dom';

import EditProductForm from '../../components/products/edit-product-details/EditProductDetailsForm';
import { ILocation } from '../../types/locations/location.interface';
import { ProductDetailsActions } from '../../components/products/product-details-actions/ProductDetailsActions';
import { ProductDetailsImage } from '../../components/products/product-details-image/ProductDetailsImage';
import { ProductDetailsInfo } from '../../components/products/product-details-info/ProductDetailsInfo';
import { useCart } from '../../context/CartContext';
import { useGetAllCategoriesQuery } from '../../services/categoryAPI';
import { useGetAllLocationsQuery } from '../../services/locationAPI';
import { useState } from 'react';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    data: product,
    isLoading: isFetchLoading,
    error: fetchError,
  } = useGetProductByIdQuery(productId || '');

  const { data: locations, error: locationsError } = useGetAllLocationsQuery();

  const { data: categories, error: categoriesError } =
    useGetAllCategoriesQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const toggleIsEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  const [isEditing, setIsEditing] = useState(false);

  if (isFetchLoading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Unable to load product</div>;
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
        </div>
      </div>
    </div>
  );
};
