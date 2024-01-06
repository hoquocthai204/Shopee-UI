import { Checkbox } from 'antd';
import orderApi from 'api/orderApi';
import discountLogo from 'assets/images/free_ship_logo.png';
import { LandingLayoutFooter } from 'components/Common';
import HeaderComponent from 'components/Common/HeaderComponent';
import { OrderGetInformation } from 'models/order/orderGetInformation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

interface CartPageProps {}

const CartPage: React.FunctionComponent<CartPageProps> = (props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [orderData, setOrderData] = useState<OrderGetInformation>();
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const summaryRef = useRef<any>(null);
  const fixedSummaryRef = useRef<any>(null);
  const token = useRef(localStorage.getItem('token')).current || '';
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (location.search) {
      const orderIdEncrypted = queryParams.get('order');
      if (orderIdEncrypted) {
        setOrderId(Number(orderIdEncrypted));
      }
    }
  }, []);

  useEffect(() => {
    if (orderId !== null && orderId !== 0) {
      getOrderData(orderId);
      setIsCheckedAll(true);
    }
  }, [orderId]);

  const getOrderData = useCallback(async (orderid) => {
    const res = await orderApi.getOrder(token, orderid);
    if (res) {
      setOrderData(res);
    }
  }, []);

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
      {orderData && (
        <div className="cart">
          <HeaderComponent title="Giỏ Hàng" />

          <div className="cart-main-container">
            <div className="cart-main__content">
              <div className="cart-notification">
                <img src={discountLogo} alt="free-ship-logo" />

                <span>
                  Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!
                </span>
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
                <CartItem isChecked={isCheckedAll} disableQuantity itemData={orderData} />
              </div>
            </div>

            <CartSummary
              forwardedRef={summaryRef}
              setIsCheckedAll={setIsCheckedAll}
              isCheckedAll={isCheckedAll}
              summaryPrice={orderData.productInfo.price * orderData.quantity}
            />
          </div>

          {!orderId && (
            <CartSummary
              forwardedRef={fixedSummaryRef}
              isFixed={true}
              setIsCheckedAll={setIsCheckedAll}
              isCheckedAll={isCheckedAll}
              summaryPrice={orderData.productInfo.price * orderData.quantity}
            />
          )}
        </div>
      )}

      <LandingLayoutFooter />
    </>
  );
};

export default CartPage;
