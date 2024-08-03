import './NavBar.scss';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import CustomerProfileDropdown from '../dropdown/CustomerProfileDropdown';
import { ICustomer } from '../../../types/customers/customer.interface';
import { LOGIN_URL_PREFIX } from '../../../constants/api.constants';
import { NavBarLinks } from '../navbar-links/NavBarLinks';
import appLogo from '../../../assets/msg-logo.png';
import { useAuthContext } from '../../../context/AuthContext';
import { useGetCustomerByIdQuery } from '../../../services/customerAPI';

export const NavBar: React.FC = () => {
  const { loggedInUserId, logout, accessToken } = useAuthContext();
  if (!loggedInUserId) {
    return;
  }
  const { data: loggedInUser } = useGetCustomerByIdQuery(loggedInUserId);
  const navigate = useNavigate();

  console.log(accessToken);

  const handleLogout = () => {
    logout();
    navigate(LOGIN_URL_PREFIX);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <NavLink to="/products" end className="navbar-brand">
            <img src={appLogo} alt="Logo" className="logo" />
          </NavLink>
          <div className="navbar-collapse">
            <NavBarLinks />
            <CustomerProfileDropdown
              customer={loggedInUser}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </nav>
      <div className="spacer"></div>
      <Outlet />
    </>
  );
};
