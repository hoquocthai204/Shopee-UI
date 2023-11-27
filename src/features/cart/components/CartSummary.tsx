import { Checkbox } from 'antd';
import { VoucherIcon } from 'components/Icons';
import React from 'react';

interface CartSummaryProps {}

const CartSummary: React.FunctionComponent<CartSummaryProps> = (props) => {
  return (
    <div className="cart-summary">
      <div className="cart-summary__voucher-wrapper">
        <span>
          <VoucherIcon />
          Shopee Voucher
        </span>
        <span>Chọn hoặc nhập mã</span>
      </div>

      <div className="cart-summary__checkout-container">
        <div className="cart-summary__checkout-options">
          <Checkbox className="cart-summary__checkbox">Chọn Tất Cả</Checkbox>
          <button className="cart-summary__checkout__option">Xóa</button>
          <button className="cart-summary__checkout__option">Lưu vào mục Đã thích</button>
        </div>

        <div className="cart-summary__price">
          <span>{`Tổng thanh toán (${1} Sản phẩm):`}</span>
          <span>{`₫${0}`}</span>
        </div>

        <button className="cart-summary__submit-btn">Mua Hàng</button>
      </div>
    </div>
  );
};

export default CartSummary;
