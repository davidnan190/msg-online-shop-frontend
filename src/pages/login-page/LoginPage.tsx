import './LoginPage.scss';

import { Navigate, useLocation } from 'react-router-dom';

import { ActionLinks } from '../../components/auth/action-links/ActionLinks';
import { LocalStorageKey } from '../../enums/local-storage-key.enum';
import LoginForm from '../../components/auth/login-form/LoginForm';
import React from 'react';
import { useLogin } from '../../hooks/auth/useLogin';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const isLoggedIn =
    (JSON.parse(localStorage.getItem(LocalStorageKey.LOGGED_IN)!) as boolean) ||
    false;
  const { login, isLoading, error } = useLogin();

  if (isLoggedIn) {
    return location?.state?.from?.pathname ? (
      <Navigate to={location?.state?.from?.pathname} replace />
    ) : (
      <Navigate to={'/'} replace />
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-body">
          <h4 className="login-card-header">Login</h4>
          {error && <div className="login-alert">{error}</div>}
          <hr />
          <LoginForm login={login} isLoading={isLoading} />
          <ActionLinks
            firstLinkText={'Create an account'}
            firstLinkPath={'/register'}
          />
        </div>
      </div>
    </div>
  );
};
