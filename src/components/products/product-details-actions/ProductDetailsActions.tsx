import './ProductDetailsActions.scss';

import React, { useState } from 'react';

import { ILocation } from '../../../interfaces/location.interface';

type Props = {
  onAddToCart: (quantity: number, location: ILocation) => void;
  onDeleteProduct: () => void;
  availableLocations: ILocation[] | undefined;
  onEditProduct: () => void;
};

const ProductDetailsActions: React.FC<Props> = ({
  onAddToCart,
  onDeleteProduct,
  availableLocations,
  onEditProduct,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >(availableLocations ? availableLocations[0] : undefined);

  return (
    <div className="product-details-actions">
      <div className="input-group">
        <div className="action-group">
          <label htmlFor="quantity" className="quantity-label">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            className="quantity-input"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            min="1"
          />
        </div>
        <div className="action-group">
          <label htmlFor="location" className="location-label">
            Location:
          </label>
          <select
            id="location"
            className="location-input"
            value={selectedLocation?.id}
            onChange={(e) => {
              const location = availableLocations?.find(
                (location) => location.id === e.target.value
              );
              setSelectedLocation(location);
            }}
          >
            {availableLocations?.map((location) => (
              <option key={location.id} value={location.id}>
                {location.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="btn btn-cart"
        onClick={() => {
          if (selectedLocation) onAddToCart(quantity, selectedLocation);
        }}
      >
        Add to Cart
      </button>
      <div className="btn-group">
        <button className="btn btn-delete" onClick={onDeleteProduct}>
          Delete Product
        </button>
        <button className="btn btn-edit" onClick={onEditProduct}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsActions;
