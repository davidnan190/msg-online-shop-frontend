import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import CartPage from './pages/CartPage';
import NavBar from './components/navbar/NavBar';
import ProductDetails from './pages/ProductDetailsPage';
import ProductsPage from './pages/ProductsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<span>Login Page</span>} />
      <Route path="register" element={<span>Login Page</span>} />

      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="*" element={<Navigate to="/" />} />

      <Route element={<NavBar />}>
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Route>
    </Route>
  )
);

export default router;
