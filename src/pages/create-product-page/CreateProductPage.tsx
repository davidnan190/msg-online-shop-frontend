import  { CreateProductForm } from '../../components/products/create-product/CreateProductForm';
import { PRODUCTS_URL_PREFIX } from '../../constants/api.constants';
import React from 'react';
import { useFetchLocations } from '../../hooks/locations/useFetchLocations';
import { useFetchProductCategories } from '../../hooks/categories/useFetchProductCategories';
import { useNavigate } from 'react-router-dom';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, isLoading: categoriesLoading } =
    useFetchProductCategories();
  const { locations  } =
    useFetchLocations();

  const handleSuccess = () => {
    navigate(PRODUCTS_URL_PREFIX);
  };

  if (categoriesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create-product-page">
      <h1>Create Product</h1>
      <CreateProductForm
        availableCategories={categories}
        availableLocations={locations}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
