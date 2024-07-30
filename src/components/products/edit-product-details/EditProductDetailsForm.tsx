import './EditProductForm.scss';

import { IProduct } from '../../../interfaces/product.interface';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  weight: z.number().min(0, 'Weight must be positive'),
  imageUrl: z.string().url('Invalid URL').optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  product: IProduct;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

const EditProductForm: React.FC<Props> = ({ product, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: product,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('id')} />
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p className="error-message">{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} />
        {errors.description && <p className="error-message">{errors.description.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input type="number" id="price" {...register('price', { valueAsNumber: true })} />
        {errors.price && <p className="error-message">{errors.price.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight</label>
        <input type="number" id="weight" {...register('weight', { valueAsNumber: true })} />
        {errors.weight && <p className="error-message">{errors.weight.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input id="imageUrl" {...register('imageUrl')} />
        {errors.imageUrl && <p className="error-message">{errors.imageUrl.message}</p>}
      </div>
      <div className="btn-group">
        <button type="submit" className="btn btn-save">Save</button>
        <button type="button" className="btn btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditProductForm;
