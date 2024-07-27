import './ProductDetailsImage.scss';

import React from 'react';

type Props = {
  imageUrl: string;
};

const ProductDetailsImage: React.FC<Props> = ({ imageUrl }) => {
  return <img src={imageUrl} alt="IProduct" className="product-image" />;
};

export default ProductDetailsImage;
