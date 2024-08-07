import './CreateProductForm.scss';

import {
  CreateProductSchema,
  createProductSchema,
} from '../../../types/schemas/create-product-schema';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { CreateProductRequest } from '../../../types/products/create-product-request.type';
import { ILocation } from '../../../types/locations/location.interface';
import { IProductCategory } from '../../../types/products/product-category.interface';
import { IStockData } from '../../../types/stocks/stock-data.interface';
import { Supplier } from '../../../enums/supplier.enum';
import { useCreateProductMutation } from '../../../services/productAPI';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateProductProps = {
  availableCategories: IProductCategory[] | undefined;
  availableLocations: ILocation[] | undefined;
  onSuccess: () => void;
};

export const CreateProductForm: React.FC<CreateProductProps> = ({
  availableCategories,
  availableLocations,
  onSuccess,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >(availableLocations ? availableLocations[0] : undefined);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stockData',
  });

  const validateUniqueLocations = (
    stockData: CreateProductSchema['stockData']
  ) => {
    const locationIds = stockData.map((item) => item.locationId);
    const uniqueLocationIds = new Set(locationIds);
    if (uniqueLocationIds.size !== locationIds.length) {
      alert('Each stock data item must have a different location.');
      return 'Each stock data item must have a different location.';
    }
    return null;
  };

  const onSubmit = async (data: CreateProductSchema) => {
    const uniqueLocationError = validateUniqueLocations(data.stockData);
    if (uniqueLocationError) {
      setError('stockData', { type: 'manual', message: uniqueLocationError });
      return;
    }

    const productData: CreateProductRequest = {
      ...data,
      supplier: data.supplier as Supplier,
      stockData: data.stockData as IStockData[],
    };

    const newProduct = await createProduct(productData);
    if (newProduct) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-product-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} />
        {errors.description && (
          <p className="error-message">{errors.description.message}</p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            min="1"
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="error-message">{errors.price.message}</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            id="weight"
            min="1"
            {...register('weight', { valueAsNumber: true })}
          />
          {errors.weight && (
            <p className="error-message">{errors.weight.message}</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label htmlFor="categoryId">Category</label>
          <select id="categoryId" {...register('categoryId')}>
            <option value="">Select a category</option>
            {availableCategories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="error-message">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="form-group half-width">
          <label htmlFor="supplier">Supplier</label>
          <select id="supplier" {...register('supplier')}>
            <option value="">Select a supplier</option>
            {Object.values(Supplier).map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
          {errors.supplier && (
            <p className="error-message">{errors.supplier.message}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL (optional)</label>
        <input id="imageUrl" {...register('imageUrl')} />
        {errors.imageUrl && (
          <p className="error-message">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="stockData">Stock Data</label>
        {fields.map((field, index) => (
          <div key={field.id} className="stock-data-group">
            <select
              {...register(`stockData.${index}.locationId`)}
              defaultValue={field.locationId || ''}
            >
              <option value="">Select a location</option>
              {availableLocations?.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.city}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              min="1"
              {...register(`stockData.${index}.quantity`, {
                valueAsNumber: true,
              })}
              defaultValue={field.quantity}
            />
            <button
              type="button"
              className="remove"
              onClick={() => remove(index)}
            >
              Remove
            </button>
            {errors.stockData?.[index]?.locationId && (
              <p className="error-message">
                {errors.stockData[index].locationId.message}
              </p>
            )}
            {errors.stockData?.[index]?.quantity && (
              <p className="error-message">
                {errors.stockData[index].quantity.message}
              </p>
            )}
          </div>
        ))}
        <button
          type="button"
          className="add-stock-data-button"
          onClick={() => append({ locationId: '', quantity: 1 })}
        >
          Add Stock Data
        </button>
      </div>

      <div className="btn-group">
        <button type="submit" className="btn btn-save" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>

        <button type="button" className="btn btn-cancel" disabled={isLoading}>
          Cancel
        </button>
      </div>
    </form>
  );
};
