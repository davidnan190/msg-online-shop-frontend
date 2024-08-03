// src/pages/products/ProductsPage.tsx

import './ProductsPage.scss';

import { ProductCard } from '../../components/products/product-card/ProductCard';
import { useFetchLocations } from '../../hooks/locations/useFetchLocations';
import { useGetAllLocationsQuery } from '../../api/locationAPI';
import { useGetAllProductsQuery } from '../../api/productAPI';

export const ProductsPage: React.FC = () => {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const { data: locations, error: locationsError } = useGetAllLocationsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Seems like an error occurred when trying to get you the latest products.
      </p>
    );
  if (locationsError)
    return (
      <p>
        Seems like an error occurred when trying to get you the available
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
