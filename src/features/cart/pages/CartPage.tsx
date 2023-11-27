import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import discountLogo from 'assets/images/free_ship_logo.png';
import { LandingLayoutFooter } from 'components/Common';
import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import HeaderConponent from '../components/HeaderConponent';
import CartSummary from '../components/CartSummary';

interface CartPageProps {}

const CartPage: React.FunctionComponent<CartPageProps> = (props) => {
  const [quantity, setQuantity] = useState<number>(1);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleChangeQuantity = (value: number) => {
    value >= 1 && setQuantity(value);
  };

  return (
    <>
      <div className="cart">
        <HeaderConponent />

        <div className="cart-main-container">
          <div className="cart-notification">
            <img src={discountLogo} alt="free-ship-logo" />

            <span>Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!</span>
          </div>

          <div className="cart__list-header">
            <Checkbox>Sản Phẩm</Checkbox>
            <span>Đơn giá</span>
            <span>Số Lượng</span>
            <span>Số Tiền</span>
            <span>Thao Tác</span>
          </div>

          <div className="cart__list">
            {Array.from(String(123456789), Number).map((element, index) => (
              <CartItem key={index} />
            ))}
          </div>

          <CartSummary />
        </div>
      </div>

      <LandingLayoutFooter />
    </>
  );
};

export default CartPage;
