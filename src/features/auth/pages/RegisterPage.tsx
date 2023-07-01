import authApi from 'api/authApi';
import { AuthInformation } from 'models';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';

interface RegisterPageProps {}

const initialValue = {
  email: '',
  password: '',
};

const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props) => {
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    handleRegister(values);
  };

  const [error, setError] = useState<string>('');

  const handleRegister = useCallback(
    async (body: AuthInformation) => {
      const res = await authApi.register(body).catch((error: any) => {
        if (error.response) setError(error.response.data.message);
      });
      if (res) {
        navigate('/login');
      }
    },
    [navigate]
  );

  return (
    <div className="register">
      <div className="register__header">
        <span>Register</span>
      </div>

      {error && <div className="register__error">{error}</div>}

      <div className="container">
        <AuthForm initialValue={initialValue} onSubmit={onSubmit} submitType={'Register'} />
      </div>
      <span className="register__nav-link">
        Already have an account? <Link to={'/login'}>Log In</Link>
      </span>
    </div>
  );
};

export default RegisterPage;
