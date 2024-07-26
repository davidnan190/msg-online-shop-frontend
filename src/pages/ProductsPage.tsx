import './ProductsPage.scss';

import ProductCard from '../components/products/product-card/ProductCard';
import { productsMock } from '../mocks/product.mock';

const Products: React.FC = () => {
  const products = productsMock;
  return (
    <>
      <h1 className="headline">Latest Products</h1>
      <div className={'product-list'}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Products;
