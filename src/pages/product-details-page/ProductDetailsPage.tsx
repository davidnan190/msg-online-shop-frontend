import './ProductDetailsPage.scss';

import { useNavigate, useParams } from 'react-router-dom';

import { ILocation } from '../../types/locations/location.interface';
import { ProductDetailsActions } from '../../components/products/product-details-actions/ProductDetailsActions';
import { ProductDetailsImage } from '../../components/products/product-details-image/ProductDetailsImage';
import { ProductDetailsInfo } from '../../components/products/product-details-info/ProductDetailsInfo';
import { useCart } from '../../context/CartContext';
import useDeleteProduct from '../../hooks/products/useDeleteProduct';
import { useFetchLocations } from '../../hooks/locations/useFetchLocations';
import useFetchProduct from '../../hooks/products/useFetchProduct';

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

  return (
    <div className="product-details-page">
      <h1 className="page-headline">Product Details</h1>
      <div className="product-details-card">
        <ProductDetailsImage imageUrl={product.imageUrl} />
        <div className="product-info">
          <ProductDetailsInfo product={product} />
          <ProductDetailsActions
            onAddToCart={handleAddToCart}
            availableLocations={locations}
            onDeleteProduct={handleDeleteProduct}
          />
          {deleteError && <div className="error-message">{deleteError}</div>}
        </div>
      </div>
    </div>
  );
};
