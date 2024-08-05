import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  CART_URL_PREFIX,
  PRODUCTS_URL_PREFIX,
} from '../../constants/api.constants';
import React, { useState } from 'react';
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
import { styled } from '@mui/material/styles';
import { useCart } from '../../context/CartContext';
import { useGetAllCategoriesQuery } from '../../services/categoryAPI';
import { useGetAllLocationsQuery } from '../../services/locationAPI';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

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

  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing((prevValue) => !prevValue);
  };

  if (isFetchLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (fetchError) {
    return <Typography color="error">Unable to load product</Typography>;
  }

  if (!product) {
    return <Typography color="error">Product not found</Typography>;
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
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography color="#a01441" variant="h4" component="h1" gutterBottom>
          Product Details
        </Typography>
        <StyledPaper elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {!isEditing && (
                <ProductDetailsImage imageUrl={product.imageUrl} />
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {isEditing ? (
                <EditProductForm
                  product={product}
                  toggleIsEditing={toggleIsEditing}
                  availableCategories={categories}
                />
              ) : (
                <>
                  <ProductDetailsInfo product={product} />
                  <ProductDetailsActions
                    onAddToCart={handleAddToCart}
                    availableLocations={locations}
                    onDeleteProduct={handleDeleteProduct}
                    onEditProduct={() => setIsEditing(true)}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    </Container>
  );
};
