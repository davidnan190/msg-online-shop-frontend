import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import { CartPage } from './pages/cart-page/CartPage';
import { NavBar } from './components/navigation/navbar/NavBar';
import { PlaceOrderPage } from './pages/place-order-page/PlaceOrderPage';
import { ProductDetailsPage } from './pages/product-details-page/ProductDetailsPage';
import { ProductsPage } from './pages/products-page/ProductsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<span>Login Page</span>} />
      <Route path="register" element={<span>Login Page</span>} />

      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="*" element={<Navigate to="/" />} />

      <Route element={<NavBar />}>
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="place-order" element={<PlaceOrderPage />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Route>
    </Route>
  )
);

export default router;
