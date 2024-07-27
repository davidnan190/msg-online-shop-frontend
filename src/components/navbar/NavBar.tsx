import './NavBar.scss';

import { NavLink, Outlet } from 'react-router-dom';

import CustomerProfileDropdown from './dropdown/CustomerProfileDropdowm';
import NavBarLinks from './navbar-links/NavBarLinks';
import appLogo from '../../assets/msg-logo.png';
import { customerMock } from '../../mocks/customer.mock';

const NavBar: React.FC = () => {
  const customer = customerMock;

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <NavLink to="/products" end className="navbar-brand">
            <img src={appLogo} alt="Logo" className="logo" />
          </NavLink>
          <div className="navbar-collapse">
            <NavBarLinks customer={customer} />
            <CustomerProfileDropdown customer={customer} isLoading={false} />
          </div>
        </div>
      </nav>
      <div className="spacer"></div>
      <Outlet />
    </>
  );
};

export default NavBar;
