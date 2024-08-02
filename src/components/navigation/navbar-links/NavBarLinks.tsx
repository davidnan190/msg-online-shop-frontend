import './NavBarLinks.scss';

import { NavLink } from 'react-router-dom';
import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';

export const NavBarLinks: React.FC = () => {
  const { isAdmin } = useAuthContext();

  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to="/products" end className="nav-link">
          <strong>Products</strong>
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to="/cart" end className="nav-link">
          <strong>My Cart</strong>
        </NavLink>
      </li>

      {isAdmin() && (
        <>
          <li className="nav-item">
            <NavLink to="/products/create" end className="nav-link">
              <strong>Add Product</strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/stock" end className="nav-link">
              <strong>Stock</strong>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};
