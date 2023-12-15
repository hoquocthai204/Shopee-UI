import { Checkbox } from 'antd';
import itemPromotionlogo from 'assets/images/cart_item_promotion.png';
import CustomInputNumber from 'features/product/components/CustomInputNumber';
import React, { useState } from 'react';

interface ICartItemProps {
  isChecked: boolean;
}

const CartItem: React.FunctionComponent<ICartItemProps> = ({ isChecked }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleChangeQuantity = (value: number) => {
    value >= 1 && setQuantity(value);
  };

  return (
    <div className="cart__item">
      <Checkbox checked={isChecked} />

      <div className="cart-item__info-wrapper">
        <div className="cart-item__img-cover">
          <img src="" alt="" />
        </div>

        <div className="cart-item__info-detail">
          <p className="cart-item__name">*tên*</p>
          <img src={itemPromotionlogo} alt="" />
        </div>

        <div className="cart-item__category-wrapper">
          <span>{`Loại hàng hóa: ${'đồ gia dụng'}`}</span>
        </div>
      </div>

      <div className="cart-item__unit-price">₫ 289.800</div>

      <div className="cart-item__quantity">
        <CustomInputNumber value={quantity} onChange={handleChangeQuantity} />
      </div>

      <span className="cart-item__price">₫289.800</span>

      <span className="cart-item__option--remove">Xóa</span>
    </div>
  );
};

export default CartItem;
