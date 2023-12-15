import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import discountLogo from 'assets/images/free_ship_logo.png';
import { LandingLayoutFooter } from 'components/Common';
import React, { useEffect, useRef, useState } from 'react';
import CartItem from '../components/CartItem';
import HeaderConponent from '../components/HeaderConponent';
import CartSummary from '../components/CartSummary';

interface CartPageProps {}

const CartPage: React.FunctionComponent<CartPageProps> = (props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const summaryRef = useRef<any>(null);
  const fixedSummaryRef = useRef<any>(null);

  const handleChangeQuantity = (value: number) => {
    value >= 1 && setQuantity(value);
  };

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  const onScroll = () => {
    if (summaryRef.current) {
      const top = summaryRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 110) {
        fixedSummaryRef.current.style.display = 'none';
      } else {
        fixedSummaryRef.current.style.display = 'block';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

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
            <Checkbox checked={isCheckedAll} onClick={handleCheckAll}>
              Sản Phẩm
            </Checkbox>
            <span>Đơn giá</span>
            <span>Số Lượng</span>
            <span>Số Tiền</span>
            <span>Thao Tác</span>
          </div>

          <div className="cart__list">
            {Array.from(String(12345), Number).map((element, index) => (
              <CartItem key={index} isChecked={isCheckedAll} />
            ))}
          </div>

          <CartSummary
            forwardedRef={summaryRef}
            setIsCheckedAll={setIsCheckedAll}
            isCheckedAll={isCheckedAll}
          />
        </div>

        <CartSummary
          forwardedRef={fixedSummaryRef}
          isFixed={true}
          setIsCheckedAll={setIsCheckedAll}
          isCheckedAll={isCheckedAll}
        />
      </div>

      <LandingLayoutFooter />
    </>
  );
};

export default CartPage;
