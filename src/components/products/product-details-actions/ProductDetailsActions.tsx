import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import React, { useState } from 'react';

import { ILocation } from '../../../types/locations/location.interface';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  marginBottom: theme.spacing(2),
}));

type ProductDetailsActionsProps = {
  onAddToCart: (quantity: number, location: ILocation) => void;
  onDeleteProduct: () => void;
  availableLocations: ILocation[] | undefined;
  onEditProduct: () => void;
};

export const ProductDetailsActions: React.FC<ProductDetailsActionsProps> = ({
  onAddToCart,
  onDeleteProduct,
  availableLocations,
  onEditProduct,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | undefined>(
    availableLocations ? availableLocations[0] : undefined
  );

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledFormControl fullWidth>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              inputProps={{ min: "1" }}
            />
          </StyledFormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledFormControl fullWidth>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              value={selectedLocation?.id || ''}
              onChange={(e) => {
                const location = availableLocations?.find(
                  (loc) => loc.id === e.target.value
                );
                setSelectedLocation(location);
              }}
              label="Location"
            >
              {availableLocations?.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  {location.city}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            if (selectedLocation) onAddToCart(quantity, selectedLocation);
          }}
        >
          Add to Cart
        </Button>
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="outlined" color="secondary" onClick={onDeleteProduct}>
          Delete Product
        </Button>
        <Button variant="outlined" color="primary" onClick={onEditProduct}>
          Edit
        </Button>
      </Box>
    </Box>
  );
};