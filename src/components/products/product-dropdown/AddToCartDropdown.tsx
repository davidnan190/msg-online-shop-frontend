import './AddToCartDropdown.scss';

import React, { useState } from 'react';

import { ILocation } from '../../../types/locations/location.interface';

type AddToCartDropdownProps = {
  availableLocations: ILocation[] | undefined;
  onAddToCart: (quantity: number, location: ILocation) => void;
};

const schema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  locationId: z.string().nonempty('Location is required'),
});

type FormData = z.infer<typeof schema>;

export const AddToCartDropdown: React.FC<AddToCartDropdownProps> = ({
  availableLocations,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >(availableLocations ? availableLocations[0] : undefined);
  

  return (
    <div className="add-to-cart-dropdown">
      <label htmlFor="location" className="location-label">
        Location:
      </label>
      <select
        id="location"
        className="location-select"
        value={selectedLocation?.id}
        onChange={(e) => {
          const location = availableLocations?.find(
            (loc) => loc.id === e.target.value
          );
          setSelectedLocation(location);
        }}
      >
        {availableLocations?.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name} {location.city ? `(${location.city})` : ''}
          </option>
        ))}
      </select>

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

      <button
        className="btn btn-add"
        onClick={() => {
          if (selectedLocation) onAddToCart(quantity, selectedLocation);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};
