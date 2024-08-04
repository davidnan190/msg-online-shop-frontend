import { CircularProgress, Container, Grid, Typography } from '@mui/material';

import { ProductCard } from '../../components/products/product-card/ProductCard';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useGetAllLocationsQuery } from '../../services/locationAPI';
import { useGetAllProductsQuery } from '../../services/productAPI';

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ProductsPage: React.FC = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const { data: locations, error: locationsError } = useGetAllLocationsQuery();

  if (isLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">
        Seems like an error occurred when trying to get you the latest products.
      </Typography>
    );
  if (locationsError)
    return (
      <Typography color="error">
        Seems like an error occurred when trying to get you the available
        locations of your products.
      </Typography>
    );

  return (
    <StyledContainer maxWidth="lg">
      <StyledTypography variant="h4">
        Latest Products
      </StyledTypography>
      <Grid container spacing={3}>
        {products &&
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard
                product={product}
                availableLocations={locations}
              />
            </Grid>
          ))}
      </Grid>
    </StyledContainer>
  );
};