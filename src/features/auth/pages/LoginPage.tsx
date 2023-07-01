import authApi from 'api/authApi';
import { useAppDispatch } from 'app/hooks';
import { AuthInformation } from 'models';
import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';
import { AuthForm } from '../components/AuthForm';

interface LoginPageProps {}

const initialValue = {
  email: '',
  password: '',
};

const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const onSubmit = (values: any) => {
    handleLogin(values);
  };

  const handleLogin = useCallback(async (body: AuthInformation) => {
    const res = await authApi.login(body).catch((error: any) => {
      if (error.response) setError(error.response.data.message);
    });

    if (res) {
      dispatch(authActions.setIsLoggedIn(true));
      localStorage.setItem('token', res.token);
      navigate('/');
    }
  }, []);

  const handleFail = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <div className="login__header">
        <span>Login</span>
      </div>
      {error && <div className="login__error">{error}</div>}
      <div className="container">
        <AuthForm
          initialValue={initialValue}
          onSubmit={onSubmit}
          onFail={handleFail}
          submitType={'Login'}
        />
      </div>
      <span className="login__nav-link">
        <Link to={'/register'}>Create a Shopee account</Link>
      </span>
    </div>
  );
};

export default LoginPage;
