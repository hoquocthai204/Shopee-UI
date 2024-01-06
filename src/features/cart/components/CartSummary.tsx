import { Checkbox } from 'antd';
import { CoinIcon, VoucherIcon } from 'components/Icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  setIsCheckedAll: (val: boolean) => void;
  isCheckedAll: boolean;
  isFixed?: boolean;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  summaryPrice?: number;
}

const CartSummary: React.FunctionComponent<CartSummaryProps> = ({
  setIsCheckedAll,
  isCheckedAll,
  isFixed,
  forwardedRef,
  summaryPrice,
}) => {
  const navigate = useNavigate();

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  const handleSubmit = () => {
    navigate('/checkout');
  };

  return (
    <div ref={forwardedRef} className={`cart-summary ${isFixed ? 'cart-summary--fixed' : ''}`}>
      <div className="cart-summary__voucher-wrapper">
        <span>
          <VoucherIcon />
          Shopee Voucher
        </span>
        <span>Chọn hoặc nhập mã</span>
      </div>

      <div className="cart-summary__checkout-container">
        <div className="cart-summary__checkout-options">
          <Checkbox
            className="cart-summary__checkbox"
            checked={isCheckedAll}
            onClick={handleCheckAll}
          >
            Chọn Tất Cả
          </Checkbox>
          <button className="cart-summary__checkout__option">Xóa</button>
          <button className="cart-summary__checkout__option">Lưu vào mục Đã thích</button>
        </div>

        <div className="cart-summary__price">
          <span>{`Tổng thanh toán (${1} Sản phẩm):`}</span>
          <span>
            <CoinIcon /> {`${summaryPrice}`}
          </span>
        </div>

        <button className="cart-summary__submit-btn" onClick={handleSubmit}>
          Mua Hàng
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
