import './ProductDetailsImage.scss';

import React from 'react';

type ProductDetailsImageProps = {
  imageUrl: string | undefined;
};

export const ProductDetailsImage: React.FC<ProductDetailsImageProps> = ({ imageUrl }) => {
  return <img src={imageUrl} alt="IProduct" className="product-image" />;
};
