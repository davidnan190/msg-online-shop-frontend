import './styles.scss';

import { CartProvider } from './context/CartContext.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app">
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </div>
  </React.StrictMode>
);
