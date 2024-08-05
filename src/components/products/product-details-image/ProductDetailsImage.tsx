import { Box, CardMedia } from '@mui/material';

import React from 'react';

type ProductDetailsImageProps = {
  imageUrl: string | undefined;
};

export const ProductDetailsImage: React.FC<ProductDetailsImageProps> = ({ imageUrl }) => {
  return (
    <Box sx={{ width: '100%', height: 0, paddingTop: '75%', position: 'relative' }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt="Product"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 1,
        }}
      />
    </Box>
  );
};