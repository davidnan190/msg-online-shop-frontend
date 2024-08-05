import './styles.scss';

import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { LoggerProvider } from './context/LoggerContext.tsx';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';
import { setupStore } from './services/store.ts';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="app">
      <Provider store={store}>
        <AuthProvider>
          <LoggerProvider>
            <CartProvider>
              {/* <ToastContainer /> */}
              <RouterProvider router={router} />
            </CartProvider>
          </LoggerProvider>
        </AuthProvider>
      </Provider>
    </div>
  </React.StrictMode>
);
