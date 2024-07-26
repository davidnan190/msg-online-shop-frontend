import { Link, Outlet } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <>
      <span>
        Stylish NavBar here <Link to="/cart"> My cart</Link>
      </span>
      <Outlet />
    </>
  );
};

export default NavBar;
