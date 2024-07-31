import './RegistrationPage.scss'

import { ActionLinks } from '../../components/auth/action-links/ActionLinks';
import RegistrationForm from '../../components/auth/registration-form/RegistrationForm';
import { RegistrationRequest } from '../../types/auth/registration-request.type';
import { useRegister } from '../../hooks/auth/useRegister';

export const RegistrationPage: React.FC = () => {
  const { register, isLoading, error } = useRegister();

  const onRegister = async (credentials: RegistrationRequest) =>
    await register(credentials);

  return (
    <div className="registration-page">
      <div className="registration-card">
        <div className="registration-card-body">
          <h4 className="registration-card-header">Register</h4>
          {error && <div className="registration-alert">{error}</div>}
          <hr />
          <RegistrationForm onRegister={onRegister} isLoading={isLoading} />
          <ActionLinks
            firstLinkText={'Go to login'}
            firstLinkPath={'/login'}
          />
        </div>
      </div>
    </div>
  );
};
