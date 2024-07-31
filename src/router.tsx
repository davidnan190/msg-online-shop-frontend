import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import { CartPage } from './pages/cart-page/CartPage';
import { CreateProductPage } from './pages/create-product-page/CreateProductPage';
import { LoginPage } from './pages/login-page/LoginPage';
import { NavBar } from './components/navigation/navbar/NavBar';
import { PlaceOrderPage } from './pages/place-order-page/PlaceOrderPage';
import { ProductDetailsPage } from './pages/product-details-page/ProductDetailsPage';
import { ProductsPage } from './pages/products-page/ProductsPage';
import { RegistrationPage } from './pages/registration-page/RegistrationPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationPage />} />

      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="*" element={<Navigate to="/" />} />

      <Route element={<NavBar />}>
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="place-order" element={<PlaceOrderPage />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Route>
    </Route>
  )
);

export default router;
