import productApi from 'api/productApi';
import slider1 from 'assets/images/banner_slider1.png';
import banner1 from 'assets/images/header_banner1.png';
import banner2 from 'assets/images/header_banner2.png';
import { ProductCard } from 'components/Common';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import CategoryContainer from '../components/CategoryContainer';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'app/hooks';
import { landingActions } from '../landingSlice';

interface LandingPageProps {}

const LandingPage: React.FunctionComponent<LandingPageProps> = (props) => {
  const [productInfo, setProductInfo] = useState<ProductInfo[] | null>(null);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const getProduct = useCallback(async () => {
    const res = await productApi.getAllProduct();
    if (res) setProductInfo(res);
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    dispatch(landingActions.setProductInfoList(productInfo));
  }, [productInfo]);

  return (
    <div className="container">
      <div className="landing-content">
        <Banner slider1={slider1} banner1={banner1} banner2={banner2} />

        <CategoryContainer />

        <div className="landing-content__header">
          <span>{t('landing.body.title1')}</span>
        </div>

        <div className="landing__list-items">
          {productInfo
            ? productInfo.map((e, i) => <ProductCard key={i} info={e} />)
            : Array.from({ length: 6 }, () => Math.random()).map((e, i) => (
                <Skeleton key={i} active />
              ))}
        </div>

        {/* {productInfo && (
          <div className="landing__button-container">
            <Button className="landing__button">See More</Button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LandingPage;
