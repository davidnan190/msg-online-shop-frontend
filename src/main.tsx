import './styles.scss';

import { CartProvider } from './context/CartContext.tsx';
import { LoggerProvider } from './context/LoggerContext.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app">
      <LoggerProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </LoggerProvider>
    </div>
  </React.StrictMode>
);
