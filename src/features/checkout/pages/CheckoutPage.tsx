import { Button } from 'antd';
import orderApi from 'api/orderApi';
import { useAppDispatch } from 'app/hooks';
import { LandingLayoutFooter } from 'components/Common';
import HeaderComponent from 'components/Common/HeaderComponent';
import { CoinIcon, LocationMarkerIcon, VoucherIcon } from 'components/Icons';
import { OrderGetInformation } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkoutActions } from '../checkoutSlice';
import AddressModal from '../components/AddressModal';
import ConfirmModal from '../components/ConfirmModal';
import { CheckCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface CheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<CheckoutPageProps> = (props) => {
  const [orderId, setOrderId] = useState<number>();
  const location = useLocation();
  const token = localStorage.getItem('token') || '';
  const [orderData, setOrderData] = useState<OrderGetInformation>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChangeAddress = () => {
    dispatch(checkoutActions.setIsOpenAddressModal(true));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (location.search) {
      const orderId = queryParams.get('state');
      if (orderId) {
        setOrderId(Number(orderId));
      }
    }
  }, []);

  useEffect(() => {
    orderId && getOrderData(orderId);
  }, [orderId]);

  const getOrderData = useCallback(async (orderid) => {
    const res = await orderApi.getOrder(token, orderid);
    if (res.status) {
      setOrderData(res);
    }
  }, []);

  const handleCheckout = () => {
    dispatch(checkoutActions.setIsConfirmModal(true));
  };

  const handleNav = () => {
    navigate('/');
  };

  return (
    <>
      <section className="checkout">
        <HeaderComponent title={t('checkout.header')} disableSearch />
        {orderData?.status === 'PENDING' && (
          <>
            <div className="checkout__dash-line" />
            <div className="checkout__delivery">
              <p className="checkout__title">
                <LocationMarkerIcon />
                {t('checkout.address')}
              </p>

              <div className="checkout__contact-container">
                <div className="checkout__contact">
                  <p className="checkout__contact-name">Hồ Quốc Thái (+84) 858673815</p>
                </div>

                <p className="checkout__address">
                  Số 294a, Đường Khuông Việt, Phường Phú Trung, Quận Tân Phú, TP. Hồ Chí Minh
                  <span>{t('checkout.default')}</span>
                </p>
                <span className="checkout__change-btn" onClick={handleChangeAddress}>
                  {t('checkout.change')}
                </span>
              </div>
            </div>

            <div className="checkout__products">
              <div className="checkout__products-header">
                <span className="checkout__products-title">{t('checkout.title1')}</span>
                <span className="checkout__column-name" />
                <span className="checkout__column-name">{t('checkout.title2')}</span>
                <span className="checkout__column-name">{t('checkout.title3')}</span>
                <span className="checkout__column-name">{t('checkout.title4')}</span>
              </div>

              <div className="checkout__product">
                {orderData && (
                  <div className="checkout__product-detail">
                    <div className="checkout__product-info">
                      <div className="checkout__product-image-wrapper">
                        <img src={orderData.productInfo.image} alt="" />
                      </div>
                      <div className="checkout__product-name">{orderData.productInfo.name}</div>
                    </div>
                    <div className="checkout__variation">
                      <span>
                        {t('checkout.type')}: {orderData.productInfo.category}
                      </span>
                    </div>
                    <span className="checkout__unit-price">{orderData.productInfo.price}</span>
                    <span className="checkout__quantity">{orderData.quantity}</span>
                    <span className="checkout__product-price">
                      {orderData.productInfo.price * orderData.quantity}
                    </span>
                  </div>
                )}

                <div className="checkout__other-option">
                  <div className="checkout__option-container">
                    <span className="checkout__option-label">{t('checkout.e_bill')}</span>
                    <span className="checkout__option-btn">{t('checkout.require')}</span>
                  </div>

                  <div className="checkout__option-container">
                    <span className="checkout__option-label">
                      <VoucherIcon /> {t('checkout.voucher')}
                    </span>
                    <span className="checkout__option-btn">{t('checkout.select_voucher')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout__summary">
              <div className="checkout__payment-container">
                <div className="checkout__payment-header">
                  <h3 className="checkout__payment-title">{t('checkout.payment_title')}</h3>
                </div>

                <div className="checkout__payment-option">
                  <p className="checkout__payment-label">{t('checkout.payment_label')}</p>
                  <button className="checkout__payment-select-btn">{t('checkout.change')}</button>
                </div>
              </div>

              <div className="checkout__total-container">
                <div className="checkout__total">
                  <p className="checkout__total-label">
                    {t('checkout.total_price')} (1 {t('checkout.title1')}):
                  </p>

                  <p className="checkout__total-price">
                    <CoinIcon /> {orderData ? orderData?.productInfo.price * orderData.quantity : 0}
                  </p>
                </div>
              </div>

              <div className="checkout__order-btn-wrapper">
                <p className="checkout__btn-description">
                  {t('checkout.summary_label')} <span>{t('checkout.summary_label_nav')}</span>
                </p>
                <Button className="checkout__order-btn" onClick={handleCheckout}>
                  {t('checkout.order')}
                </Button>
              </div>
            </div>
          </>
        )}

        {orderData?.status === 'PAID' && (
          <div className="checkout-alert">
            <span>
              <CheckCircleFilled style={{ color: '#00F295' }} />
              {t('checkout.order_checkouted')}
            </span>

            <Button
              className="checkout-alert__nav-btn"
              key="back"
              danger
              type="primary"
              onClick={handleNav}
            >
              {t('checkout.continue_buy')}
            </Button>
          </div>
        )}
      </section>

      <LandingLayoutFooter />

      <AddressModal />

      {orderId && <ConfirmModal orderId={orderId} />}
    </>
  );
};

export default CheckoutPage;
