import './LoginPage.scss';

import {
  PRODUCTS_URL_PREFIX,
  REGISTRATION_URL_PREFIX,
} from '../../constants/api.constants';

import { ActionLinks } from '../../components/auth/action-links/ActionLinks';
import LoginForm from '../../components/auth/login-form/LoginForm';
import { LoginRequest } from '../../types/auth/login-request.type';
import { getErrorMessage } from '../../utils/error.utils';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import { useLoginMutation } from '../../services/authAPI';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuthContext();
  const [login, { isLoading, error }] = useLoginMutation();

  const onLogin = async (credentials: LoginRequest) => {
    try {
      const response = await login(credentials).unwrap();
      authLogin(
        response.tokens.accessToken,
        response.tokens.refreshToken,
        response.customer
      );
      navigate(PRODUCTS_URL_PREFIX);
      toast.success('Login successful!');
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-body">
          <h4 className="login-card-header">Login</h4>
          {error && <div className="login-alert">{getErrorMessage(error)}</div>}
          <hr />
          <LoginForm onLogin={onLogin} isLoading={isLoading} />
          <ActionLinks
            firstLinkText={'Create an account'}
            firstLinkPath={REGISTRATION_URL_PREFIX}
          />
        </div>
      </div>
    </div>
  );
};
