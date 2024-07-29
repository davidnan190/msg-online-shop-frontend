import './ProductsPage.scss';

import ProductCard from '../../components/products/product-card/ProductCard';
import useFetchLocations from '../../hooks/locations/useFetchLocations';
import useFetchProducts from '../../hooks/products/useFetchProducts';

const ProductsPage: React.FC = () => {
  const {
    products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useFetchProducts();
  const {
    locations,
    error: locationsError,
  } = useFetchLocations();

  if (isProductsLoading) return <p>Loading...</p>;

  if (productsError)
    return (
      <p>
        Seems like an error occured when trying to get you the latest products.
      </p>
    );

  if (locationsError)
    return (
      <p>
        Seems like an error occured when trying to get you the available
        locations of your products.
      </p>
    );

  return (
    <>
      <h1 className="page-headline">Latest Products</h1>
      <div className={'product-list'}>
        {products &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              availableLocations={locations}
            />
          ))}
      </div>
    </>
  );
};

export default ProductsPage;
