import ProductList from '../components/products/ProductList';
import { productsMock } from '../mocks/product.mock';

const Test = () => {
  return (
    <>
      <h1 className="headline">msg Romania Online Shop</h1>
      <ProductList products={productsMock} />
    </>
  );
};

export default Test;
