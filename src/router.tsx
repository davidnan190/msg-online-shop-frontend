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
import ProtectedRoute from './components/auth/ProtectedRoute';
import { RegistrationPage } from './pages/registration-page/RegistrationPage';
import RestrictedRoute from './components/auth/RestrictedRoute';
import { Role } from './enums/role.enum';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationPage />} />

      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="*" element={<Navigate to="/" />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<NavBar />}>
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailsPage />} />

          <Route path="cart" element={<CartPage />} />
          <Route path="place-order" element={<PlaceOrderPage />} />
          <Route element={<RestrictedRoute requiredRole={Role.ADMIN} />}>
            <Route path="products/create" element={<CreateProductPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/products" />} />
        </Route>
      </Route>

      <Route />
    </Route>
  )
);

export default router;
