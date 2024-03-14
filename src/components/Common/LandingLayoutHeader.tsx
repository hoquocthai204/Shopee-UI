import { ShoppingCartOutlined } from '@ant-design/icons';
import { SearchIcon, ShopLogo } from 'components/Icons';
import { recommentProductTagInfo } from 'constants/landing/recommentProductTagInfo';
import React, { ChangeEvent, LegacyRef, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTopNav from './HeaderTopNav';
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { landingActions, selectStates } from 'features/landing/landingSlice';
import { ProductInfo } from 'models/product/productInfo';
import productApi from 'api/productApi';

export interface LandingLayoutHeaderProps {}

export const LandingLayoutHeader: React.FunctionComponent<LandingLayoutHeaderProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const navigate = useNavigate();
  const productInfoList = useAppSelector(selectStates).productInfoList;
  const productResultRef = useRef<HTMLUListElement>(null);
  const dispatch = useAppDispatch();

  const handleOpenCart = () => {
    // navigate('/cart');
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    productResultRef.current && (productResultRef.current.style.display = 'block');
  };

  useEffect(() => {
    !inputValue && productResultRef.current && (productResultRef.current.style.display = 'none');
  }, [inputValue]);

  useEffect(() => {
    if (!productInfoList) {
      getProduct();
    }
  }, [productInfoList]);

  const getProduct = useCallback(async () => {
    const res = await productApi.getAllProduct();
    if (res) dispatch(landingActions.setProductInfoList(res));
  }, []);

  const handleProductNav = (id: number | undefined) => {
    id && navigate(`/products/${id}`);
    productResultRef.current && (productResultRef.current.style.display = 'none');
  };

  return (
    <>
      <HeaderTopNav />
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
                value={inputValue}
                onChange={handleChangeInput}
              />
              <Button className="landing-header__search-btn">
                <SearchIcon />
              </Button>

              <ul ref={productResultRef} className="landing-search__result-container">
                {productInfoList &&
                  productInfoList
                    .filter(
                      (e: ProductInfo) =>
                        e.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                    )
                    .slice(0, 10)
                    .map((e: ProductInfo) => (
                      <li key={e.id} onClick={() => handleProductNav(e.id)}>
                        <p>{e.name}</p>
                      </li>
                    ))}
              </ul>
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
