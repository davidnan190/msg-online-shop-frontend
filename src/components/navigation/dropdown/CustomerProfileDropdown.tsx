import './CustomerProfileDropdown.scss';

import React, { useState } from 'react';

import { ICustomer } from '../../../types/customers/customer.interface';
import { NavLink } from 'react-router-dom';

type CustomerProfileDropdownProps = {
  customer: ICustomer | undefined;
  isLoading: boolean;
};

const CustomerProfileDropdown: React.FC<CustomerProfileDropdownProps> = ({
  customer,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="dropdown">
      <div className="profile-dropdown" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={
            isLoading
              ? 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODF4MTlob2VueGN5YTk4dTFhZTVleGplZGRhNndlYjVpeTkwaHNpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif'
              : 'https://via.placeholder.com/480'
          }
          alt="User"
          className="profile-pic"
        />
      </div>
      {isOpen && (
        <ul className="dropdown-menu show">
          <li>
            <NavLink to="/profile/details" end className="dropdown-item">
              <img
                src="https://via.placeholder.com/480"
                alt={customer?.firstName}
                className="profile-pic-small"
              />
              <div>
                <p className="customer-name">
                  {customer?.firstName} {customer?.lastName}
                </p>
                <p className="customer-email">{customer?.emailAddress}</p>
              </div>
            </NavLink>
          </li>
          <hr className="dropdown-divider" />
          <li>
            <NavLink to="/customer/password" end className="dropdown-item">
              <i className="bi bi-key"></i> Password
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer/settings" end className="dropdown-item">
              <i className="bi bi-gear-wide-connected"></i> Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/customer/authorization" end className="dropdown-item">
              <i className="bi bi-shield-exclamation"></i> Authorization
            </NavLink>
          </li>
          <hr className="dropdown-divider" />
          <li>
            <a className="dropdown-item dropdown-item-danger">
              <i className="bi bi-box-arrow-right"></i> Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomerProfileDropdown;