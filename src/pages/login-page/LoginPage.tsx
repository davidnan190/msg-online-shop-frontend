import './LoginPage.scss';

import { Navigate, useLocation } from 'react-router-dom';

import { ActionLinks } from '../../components/auth/action-links/ActionLinks';
import { LocalStorageKey } from '../../enums/local-storage-key.enum';
import LoginForm from '../../components/auth/login-form/LoginForm';
import { LoginRequest } from '../../types/auth/login-request.type';
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useLogin } from '../../hooks/auth/useLogin';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  

  // if (accessToken) {
  //   return location?.state?.from?.pathname ? (
  //     <Navigate to={location?.state?.from?.pathname} replace />
  //   ) : (
  //     <Navigate to={'/'} replace />
  //   );
  // }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-body">
          <h4 className="login-card-header">Login</h4>
          {/* {error && <div className="login-alert">{error}</div>} */}
          <hr />
          <LoginForm  />
          <ActionLinks
            firstLinkText={'Create an account'}
            firstLinkPath={'/register'}
          />
        </div>
      </div>
    </div>
  );
};
