import './NavBarLinks.scss';

import { ICustomer } from '../../../interfaces/customer.interface';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Role } from '../../../enums/role.enum';

type Props = {
  customer: ICustomer | undefined;
};

const NavBarLinks: React.FC<Props> = ({ customer }) => {
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

      {customer?.role === Role.ADMIN && (
        <li className="nav-item">
          <NavLink to="/stock" end className="nav-link">
            <strong>Stock</strong>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavBarLinks;
