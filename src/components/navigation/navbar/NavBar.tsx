import './NavBar.scss';

import { NavLink, Outlet } from 'react-router-dom';

import CustomerProfileDropdown from '../dropdown/CustomerProfileDropdown';
import { ICustomer } from '../../../types/customers/customer.interface';
import { NavBarLinks } from '../navbar-links/NavBarLinks';
import appLogo from '../../../assets/msg-logo.png';
import { useAuthContext } from '../../../context/AuthContext';
import { useFetchCustomer } from '../../../hooks/customers/useFetchCustomer';

export const NavBar: React.FC = () => {
  const { retrieveLoggedInUser } = useAuthContext();
  const loggedInUser = retrieveLoggedInUser() as ICustomer;

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <NavLink to="/products" end className="navbar-brand">
            <img src={appLogo} alt="Logo" className="logo" />
          </NavLink>
          <div className="navbar-collapse">
            <NavBarLinks customer={loggedInUser} />
            <CustomerProfileDropdown customer={loggedInUser} />
          </div>
        </div>
      </nav>
      <div className="spacer"></div>
      <Outlet />
    </>
  );
};
