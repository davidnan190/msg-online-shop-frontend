import './App.scss';

import ProductDetails from './components/products/ProductDetails';
import Products from './pages/Products';

const App: React.FC = () => {
  return (
    <div className="app">
      <Products />
      <ProductDetails/>
    </div>
  );
};

export default App;
