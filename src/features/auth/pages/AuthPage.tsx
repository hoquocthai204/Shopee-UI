import { Divider } from 'antd';
import authApi from 'api/authApi';
import { useAppDispatch } from 'app/hooks';
import { LandingLayoutFooter } from 'components/Common';
import { ErrorIcon, QrCodeIcon, ShopeeLogo } from 'components/Icons';
import { AuthInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';
import { AuthForm } from '../components/AuthForm';

interface AuthPageProps {
  isLogin?: boolean;
}

const initialValue = {
  email: '',
  password: '',
};

const AuthPage: React.FunctionComponent<AuthPageProps> = ({ isLogin }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    navigate('/');
  };

  const handleNavSignup = () => {
    navigate('/register');
  };

  const handleNavSignin = () => {
    navigate('/login');
  };

  useEffect(() => {
    setError('');
  }, [isLogin]);

  const handleFail = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onSubmit = (values: any) => {
    isLogin ? handleAuth(values) : handleRegister(values);
  };

  const handleAuth = useCallback(async (body: AuthInformation) => {
    const res = await authApi.login(body).catch((error: any) => {
      if (error.response) setError(error.response.data.message);
    });

    if (res) {
      dispatch(authActions.setIsLoggedIn(true));
      localStorage.setItem('token', res.token);
      navigate('/');
    }
  }, []);

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
    <div className="auth">
      <div className="auth-header">
        <div className="auth-header__left-side">
          <div className="auth-header__img-container">
            <ShopeeLogo onClick={handleNavigate} />
          </div>
          <span>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>
        </div>
        <div className="auth-header__right-side">Bạn cần giúp đỡ?</div>
      </div>

      <div className="auth-content">
        <div className="auth-content__wrapper">
          <div className="auth-content__container">
            <div className="auth-content__header">
              <span className="auth-content__title">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>

              {isLogin && (
                <div className="auth-content__option">
                  <div className="auth-content__option-alert">
                    Đăng nhập với mã <br />
                    QR
                  </div>
                  <QrCodeIcon />
                </div>
              )}
            </div>

            {error && (
              <div className="auth__error">
                <ErrorIcon /> {error}
              </div>
            )}

            <div className="auth-content__form">
              <AuthForm
                initialValue={initialValue}
                onSubmit={onSubmit}
                onFail={handleFail}
                submitType={isLogin ? 'Đăng nhập' : 'Đăng ký'}
              />
            </div>

            <div className="auth-content__navs">
              {isLogin && (
                <>
                  <span>Quên mật khẩu</span>
                  <span>Đăng nhập với SMS</span>
                </>
              )}
            </div>

            <Divider plain>HOẶC</Divider>

            <div className="auth-content__option-box">
              <button>
                <div className="auth-content__option-logo auth-facebook"></div> Facebook
              </button>
              <button>
                <div className="auth-content__option-logo auth-google"></div> Google
              </button>
            </div>

            {isLogin ? (
              <p className="auth-content_other-option">
                Bạn mới biết đến Shopee? <span onClick={handleNavSignup}>Đăng ký</span>
              </p>
            ) : (
              <p className="auth-content_other-option">
                Bạn đã có tài khoản? <span onClick={handleNavSignin}>Đăng nhập</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <LandingLayoutFooter />
      </div>
    </div>
  );
};

export default AuthPage;
