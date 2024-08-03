import './RegistrationPage.scss';

import { ActionLinks } from '../../components/auth/action-links/ActionLinks';
import { LOGIN_URL_PREFIX } from '../../constants/api.constants';
import RegistrationForm from '../../components/auth/registration-form/RegistrationForm';
import { RegistrationRequest } from '../../types/auth/registration-request.type';
import { getErrorMessage } from '../../utils/error.utils';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../api/authAPI';

export const RegistrationPage: React.FC = () => {
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

  const onRegister = async (credentials: RegistrationRequest) => {
    try {
      await register(credentials).unwrap();
      if (isSuccess) {
        toast.success('Registration successful!');
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-card">
        <div className="registration-card-body">
          <h4 className="registration-card-header">Register</h4>
          {error && (
            <div className="registration-alert">{getErrorMessage(error)}</div>
          )}
          <hr />
          <RegistrationForm onRegister={onRegister} isLoading={isLoading} />
          <ActionLinks
            firstLinkText={'Go to login'}
            firstLinkPath={LOGIN_URL_PREFIX}
          />
        </div>
      </div>
    </div>
  );
};
