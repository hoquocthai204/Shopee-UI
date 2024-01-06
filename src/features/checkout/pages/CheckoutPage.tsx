import { Button, Modal } from 'antd';
import { LandingLayoutFooter } from 'components/Common';
import HeaderComponent from 'components/Common/HeaderComponent';
import { CoinIcon, LocationMarkerIcon, VoucherIcon } from 'components/Icons';
import React, { useState } from 'react';
import AddressModal from '../components/AddressModal';

interface CheckoutPageProps {}

const CheckoutPage: React.FunctionComponent<CheckoutPageProps> = (props) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChangeAddress = () => {
    setOpenAddressModal(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenAddressModal(false);
    }, 1000);
  };
  return (
    <>
      <section className="checkout">
        <HeaderComponent title={'Thanh Toán'} disableSearch />

        <div className="checkout__dash-line" />
        <div className="checkout__delivery">
          <p className="checkout__title">
            <LocationMarkerIcon />
            Địa Chỉ Nhận Hàng
          </p>

          <div className="checkout__contact-container">
            <div className="checkout__contact">
              <p className="checkout__contact-name">Hồ Quốc Thái (+84) 858673815</p>
            </div>

            <p className="checkout__address">
              Số 294a, Đường Khuông Việt, Phường Phú Trung, Quận Tân Phú, TP. Hồ Chí Minh
              <span>Mặc Định</span>
            </p>
            <span className="checkout__change-btn" onClick={handleChangeAddress}>
              Thay Đổi
            </span>
          </div>
        </div>

        <div className="checkout__products">
          <div className="checkout__products-header">
            <span className="checkout__products-title">Sản phẩm</span>
            <span className="checkout__column-name" />
            <span className="checkout__column-name">Đơn giá</span>
            <span className="checkout__column-name">Số lượng</span>
            <span className="checkout__column-name">Thành tiền</span>
          </div>

          <div className="checkout__product">
            <div className="checkout__product-detail">
              <div className="checkout__product-info">
                <div className="checkout__product-image-wrapper">
                  <img src="" alt="" />
                </div>
                <div className="checkout__product-name">
                  Nước Mắm Nam Ngư Ớt Tỏi Lý Sơn/ Mắm Me Pha Sẵn/ Mắm Gừng 300ml
                </div>
              </div>
              <div className="checkout__variation">
                <span>Loại: Ớt tỏi 300ml</span>
              </div>
              <span className="checkout__unit-price">35.000</span>
              <span className="checkout__quantity">1</span>
              <span className="checkout__product-price">35.000</span>
            </div>

            <div className="checkout__other-option">
              <div className="checkout__option-container">
                <span className="checkout__option-label">Hóa đơn điện tử</span>
                <span className="checkout__option-btn">Yêu Cầu Ngay</span>
              </div>

              <div className="checkout__option-container">
                <span className="checkout__option-label">
                  <VoucherIcon /> Voucher của Shop
                </span>
                <span className="checkout__option-btn">Chọn Voucher</span>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout__summary">
          <div className="checkout__payment-container">
            <div className="checkout__payment-header">
              <h3 className="checkout__payment-title">Phương thức thanh toán</h3>
            </div>

            <div className="checkout__payment-option">
              <p className="checkout__payment-label">Thanh toán khi nhận hàng</p>
              <button className="checkout__payment-select-btn">THAY ĐỔI</button>
            </div>
          </div>

          <p className="checkout__total-container">
            <div className="checkout__total">
              <p className="checkout__total-label">Tổng thanh toán (1 sản phẩm):</p>
              <p className="checkout__total-price">
                <CoinIcon /> 3
              </p>
            </div>
          </p>

          <div className="checkout__order-btn-wrapper">
            <p className="checkout__btn-description">
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{' '}
              <span>Điều khoản Shopee</span>
            </p>
            <Button className="checkout__order-btn">Đặt hàng</Button>
          </div>
        </div>
      </section>
      <LandingLayoutFooter />

      <AddressModal isOpen={openAddressModal} setIsOpen={setOpenAddressModal} />
    </>
  );
};

export default CheckoutPage;
