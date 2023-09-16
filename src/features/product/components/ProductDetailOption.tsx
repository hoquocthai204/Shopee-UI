import { Button } from 'antd';
import { AddCartIcon } from 'components/Icons';
import React from 'react';

interface ProductDetailOptionProps {
  handleBuy: () => void;
}

const ProductDetailOption: React.FunctionComponent<ProductDetailOptionProps> = ({ handleBuy }) => {
  return (
    <div className="product-detail__options">
      <Button type={'default'} size={'large'} danger>
        <AddCartIcon />
        Thêm Vào Giỏ Hàng
      </Button>
      <Button onClick={handleBuy} type={'primary'} size={'large'} danger>
        Mua Ngay
      </Button>
    </div>
  );
};

export default ProductDetailOption;
