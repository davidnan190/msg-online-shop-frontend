import { CreateProductForm } from '../../components/products/create-product/CreateProductForm';
import { PRODUCTS_URL_PREFIX } from '../../constants/api.constants';
import React from 'react';
import { useGetAllCategoriesQuery } from '../../api/categoryAPI';
import { useGetAllLocationsQuery } from '../../api/locationAPI';
import { useNavigate } from 'react-router-dom';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: categories,
    error: categoriesError,
  } = useGetAllCategoriesQuery();
  const { data: locations, error: locationsError } = useGetAllLocationsQuery();
  const handleSuccess = () => {
    navigate(PRODUCTS_URL_PREFIX);
  };

  if (categoriesError || locationsError) {
    navigate(PRODUCTS_URL_PREFIX);
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
