import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import authApi from 'api/authApi';
import merchantApi from 'api/merchantApi';
import userApi from 'api/userApi';
import walletApi from 'api/walletApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import appQrcode from 'assets/images/shopee_qrcode.png';
import {
  DownIcon,
  HelpIcon,
  NotificationIcon,
  SearchIcon,
  ShopLogo,
  TranslateIcon,
} from 'components/Icons';
import { CoinIcon } from 'components/Icons/CoinIcon';
import { recommentProductTagInfo } from 'constants/landing/recommentProductTagInfo';
import { authActions, selectIsLoggedIn, selectIsMerchant } from 'features/auth/authSlice';
import { UserInformation } from 'models/user/userInformation';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface LandingLayoutHeaderProps {}

export const LandingLayoutHeader: React.FunctionComponent<LandingLayoutHeaderProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [balance, setBalance] = useState(0);
  const [userDetail, setUserDetail] = useState<UserInformation>();
  const [isMerchant, setIsMerchant] = useState<boolean>(false);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isMerchantState = useAppSelector(selectIsMerchant);

  const getUserDetail = useCallback(async () => {
    const res = await userApi.getUserDetail(localStorage.getItem('token') || '').catch(() => {
      dispatch(authActions.setIsLoggedIn(false));
      localStorage.removeItem('token');
    });

    if (res) {
      setUserDetail(res);
      dispatch(authActions.setIsLoggedIn(true));
    }
  }, []);

  useEffect(() => {
    getUserDetail();
    checkIsMerchant();
  }, []);

  useEffect(() => {
    if (isMerchantState) checkIsMerchant();
  }, [isMerchantState]);

  useEffect(() => {
    if (isLoggedIn) checkIsMerchant();
  }, [isLoggedIn]);

  const getBalance = useCallback(async () => {
    const token = localStorage.getItem('token') || '';
    const res = await walletApi.getWallet(token).catch(() => setBalance(0));
    if (res) {
      setBalance(res.balance);
    }
  }, [localStorage.getItem('token')]);

  const handlePopover = (value: boolean) => {
    getBalance();
    getUserDetail();
    checkIsMerchant();
  };

  const checkIsMerchant = useCallback(async () => {
    const token = localStorage.getItem('token') || '';
    const res = await merchantApi.checkIsMerchant(token);
    if (res) {
      setIsMerchant(res);
    } else setIsMerchant(res);
  }, []);

  const logout = useCallback(async () => {
    const res = await authApi.logout(localStorage.getItem('token') || '').catch(() => {
      localStorage.removeItem('token');
      navigate('/');
    });

    if (res === 'success') {
      dispatch(authActions.setIsLoggedIn(false));
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      localStorage.removeItem('token');
      navigate('/');
    }
  }, []);

  const handleOpenCart = () => {
    navigate('cart');
  };

  const content = (
    <div className="landing-header__option-container">
      <div className="auth-option">
        Balance:{' '}
        <span>
          <CoinIcon /> {balance}
        </span>
      </div>
      {isMerchant ? (
        <div className="auth-option">
          <span>Merchant: </span>
          <span style={{ color: '#00F295' }}>Registered</span>
        </div>
      ) : (
        <div className="auth-option" onClick={() => handleNav('merchant')}>
          <span>Merchant: </span>
          <span style={{ color: '#ccc' }}>Unregistered</span>
        </div>
      )}

      <div className="auth-option" onClick={() => handleNav('recharge')}>
        Recharge
      </div>

      {isMerchant && (
        <div className="auth-option" onClick={() => handleNav('products')}>
          Products
        </div>
      )}

      <div className="auth-option" onClick={() => handleNav('transaction-history')}>
        Transaction History
      </div>

      <div className="auth-option" onClick={() => handleNav('user-detail')}>
        Account Detail
      </div>

      <div className="auth-option" onClick={logout}>
        Log Out
      </div>
    </div>
  );

  const downloadContent = (
    <div className="shopee-qrcode">
      <img src={appQrcode} alt="app-qrcode" />
    </div>
  );

  const handleNav = (val: string) => {
    navigate(val);
  };

  return (
    <>
      <div className="landing-top__navbar">
        <div className="container">
          <div className="landing-top__group">
            <span className="landing-top__nav">Kênh Người Bán</span>
            <div className="landing-top__divider" />
            {!isLoggedIn && (
              <>
                <span className="landing-top__nav">Trở thành Người bán Shopee</span>
                <div className="landing-top__divider" />
              </>
            )}
            <Popover content={downloadContent} placement="bottomLeft">
              <span className="landing-top__nav">Tải ứng dụng</span>
            </Popover>
            <div className="landing-top__divider" />
            <span className="landing-top__nav">Kết nối</span>
          </div>

          <div className="landing-top__group">
            <span className="landing-top__nav">
              <NotificationIcon style={{ width: '14px', height: '18px' }} /> Thông Báo
            </span>
            <span className="landing-top__nav">
              <HelpIcon style={{ width: '18px', height: '18px' }} />
              Hỗ Trợ
            </span>
            <span className="landing-top__nav">
              <TranslateIcon style={{ width: '16px', height: '16px' }} />
              Tiếng Việt
              <DownIcon />
            </span>
            {!isLoggedIn ? (
              <>
                <span className="landing-top__nav" onClick={() => navigate('register')}>
                  Đăng Ký
                </span>
                <div className="landing-top__divider" />
                <span className="landing-top__nav" onClick={() => navigate('login')}>
                  Đăng Nhập
                </span>
              </>
            ) : (
              <Popover
                style={{ width: '600px' }}
                onVisibleChange={handlePopover}
                placement="bottomRight"
                title={<span>{userDetail?.email}</span>}
                content={content}
                // trigger="click"

                className="landing-avatar__container"
              >
                <div className="landing-avatar__logo">
                  <UserOutlined />
                </div>
                <span className="landing-avatar__name">{userDetail?.email.split('@')[0]}</span>
                {/* <span className="landing-avatar__name">thaivu204</span> */}
              </Popover>
            )}
          </div>
        </div>
      </div>
      <div className="landing-header">
        <div className="container">
          <div className="landing-header__left-side">
            <ShopLogo onClick={() => navigate('')} />
          </div>
          <div className="landing-header__middle">
            <div className="landing-header__searchbar">
              <input
                type="text"
                className="landing-header__input"
                placeholder="TẶNG MÁY TĂM NƯỚC 2.490.000Đ"
              />
              <button className="landing-header__search-btn">
                <SearchIcon />
              </button>
            </div>
            <ul className="landing-header__tag-list">
              {recommentProductTagInfo.map((val, index) => (
                <li key={index} className="landing-header__tag">
                  {val.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="landing-header__right-side">
            <ShoppingCartOutlined onClick={handleOpenCart} />
          </div>
        </div>
      </div>
    </>
  );
};
