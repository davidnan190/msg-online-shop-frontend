import './CustomerProfileDropdown.scss';

import React, { useState } from 'react';

import { ICustomer } from '../../../types/customers/customer.interface';
import { NavLink } from 'react-router-dom';

type CustomerProfileDropdownProps = {
  customer: ICustomer | undefined;
  onLogout: () => void;
};

const CustomerProfileDropdown: React.FC<CustomerProfileDropdownProps> = ({
  customer,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="dropdown">
      <div className="profile-dropdown" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={'https://via.placeholder.com/480'}
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
            <a className="dropdown-item logout" onClick={() => onLogout()}>
              Logout
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomerProfileDropdown;
