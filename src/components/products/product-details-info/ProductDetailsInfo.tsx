import { Box, Chip, Typography } from '@mui/material';

import { IProduct } from '../../../types/products/product.interface';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  marginBottom: theme.spacing(1),
}));

type ProductDetailsInfoProps = {
  product: IProduct;
};

export const ProductDetailsInfo: React.FC<ProductDetailsInfoProps> = ({ product }) => {
  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        {product.name}
      </Typography>
      <StyledChip label={product.category.name} />
      <Typography variant="h6" color="primary" gutterBottom>
        {product.price} RON
      </Typography>
      <Typography variant="body1" gutterBottom>
        Weight: {product.weight} kg
      </Typography>
      <Typography variant="body1" gutterBottom>
        Supplier: {product.supplier}
      </Typography>
      <Typography variant="body2">{product.description}</Typography>
    </Box>
  );
};