import './LoginPage.scss';

import { ActionLinks } from '../../components/auth/action-links/ActionLinks';
import LoginForm from '../../components/auth/login-form/LoginForm';
import React from 'react';

export const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-body">
          <h4 className="login-card-header">Login</h4>
          <hr />
          <LoginForm />
          <ActionLinks
            firstLinkText={'Create an account'}
            firstLinkPath={'/register'}
          />
        </div>
      </div>
    </div>
  );
};
