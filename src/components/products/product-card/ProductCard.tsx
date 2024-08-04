import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import React, { useState } from 'react';

import { AddToCartDropdown } from '../product-dropdown/AddToCartDropdown';
import { ILocation } from '../../../types/locations/location.interface';
import { IProduct } from '../../../types/products/product.interface';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useCart } from '../../../context/CartContext';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '75%', // 4:3 aspect ratio
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const CategoryChip = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.875rem',
  marginBottom: theme.spacing(1),
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: `0 0 0 ${theme.shape.borderRadius}px`,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  '.MuiCard-root:hover &': {
    opacity: 1,
  },
}));

type ProductCardProps = {
  product: IProduct | undefined;
  availableLocations: ILocation[] | undefined;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, availableLocations }) => {
  const { addToCart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddToCart = (quantity: number, desiredLocation: ILocation) => {
    if (product && showDropdown) {
      addToCart(product, quantity, desiredLocation);
      setShowDropdown(false);
    }
  };

  const handleAddToCartDropdown = () => {
    setShowDropdown((prevValue) => !prevValue);
  };

  if (!product) return null;

  return (
    <StyledCard>
      <Box sx={{ position: 'relative' }}>
        <StyledCardMedia
          image={product.imageUrl}
          title={product.name}
        />
        <StyledCardActions>
          <IconButton onClick={handleAddToCartDropdown} color="primary">
            <FaShoppingCart />
          </IconButton>
          <IconButton component={Link} to={`/products/${product.id}`} color="primary">
            <FaInfoCircle />
          </IconButton>
        </StyledCardActions>
      </Box>
      <StyledCardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {product.name}
        </Typography>
        <CategoryChip>{product.category.name}</CategoryChip>
        <Typography variant="h6" color="primary">
          {product.price} RON
        </Typography>
        <Typography variant="body2" color="text.secondary">
          From {product.supplier}
        </Typography>
      </StyledCardContent>
      {showDropdown && (
        <AddToCartDropdown
          onAddToCart={handleAddToCart}
          availableLocations={availableLocations}
        />
      )}
    </StyledCard>
  );
};