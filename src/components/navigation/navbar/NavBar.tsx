import './NavBar.scss';

import { NavLink, Outlet } from 'react-router-dom';

import CustomerProfileDropdown from '../dropdown/CustomerProfileDropdowm';
import NavBarLinks from '../navbar-links/NavBarLinks';
import { TEMP_HARDCODED_CUSTOMER_ID } from '../../../constants/api.constants';
import appLogo from '../../../assets/msg-logo.png';
import useFetchCustomer from '../../../hooks/customers/useFetchCustomer';

const NavBar: React.FC = () => {

  const { customer, isLoading, error} = useFetchCustomer(TEMP_HARDCODED_CUSTOMER_ID);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <NavLink to="/products" end className="navbar-brand">
            <img src={appLogo} alt="Logo" className="logo" />
          </NavLink>
          <div className="navbar-collapse">
            <NavBarLinks customer={customer} />
            <CustomerProfileDropdown customer={customer} isLoading={isLoading} />
          </div>
        </div>
      </nav>
      <div className="spacer"></div>
      <Outlet />
    </>
  );
};

export default NavBar;
