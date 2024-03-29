import { Skeleton } from 'antd';
import orderApi from 'api/orderApi';
import productApi from 'api/productApi';
import walletApi from 'api/walletApi';
import { useAppSelector } from 'app/hooks';
import warrantyIcon from 'assets/images/warranty_icon.png';
import { Breadcrumb, ModalComponent } from 'components/Common';
import { CoinIcon } from 'components/Icons/CoinIcon';
import { selectIsLoggedIn } from 'features/auth/authSlice';
import { ProductInfo } from 'models/product/productInfo';
import { WalletInformation } from 'models/wallet/walletInformation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomInputNumber from '../components/CustomInputNumber';
import ProductDetailOption from '../components/ProductDetailOption';
import ProductDetailReview from '../components/ProductDetailReview';
import RateSummary from '../components/RateSummary';

interface ProductDetailPageProps {}

const ProductDetailPage: React.FunctionComponent<ProductDetailPageProps> = (props) => {
  const [productDetail, setProductDetail] = useState<ProductInfo>();
  const token = useRef(localStorage.getItem('token')).current || '';
  const [quantity, setQuantity] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [walletInfo, setWalletInfo] = useState<WalletInformation>();
  const [isEnoughBalance, setIsEnoughBalance] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number | boolean>(false);
  const { t } = useTranslation();

  const locate = useLocation();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const productId = Number(locate.pathname.split('/')[2]);
    getProductDetail(productId);
  }, [locate.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getProductDetail = useCallback(async (id: number) => {
    const res = await productApi.getProduct(id);
    if (res) {
      setProductDetail(res);
    }
  }, []);

  useEffect(() => {
    if (productDetail?.price && walletInfo?.balance) {
      if (quantity * productDetail.price <= walletInfo.balance) {
        setIsEnoughBalance(true);
      } else setIsEnoughBalance(false);
    }
  }, [productDetail, walletInfo]);

  useEffect(() => {
    if (productDetail?.price && walletInfo?.balance) {
      if (quantity * productDetail.price <= walletInfo.balance) {
        setIsEnoughBalance(true);
      } else setIsEnoughBalance(false);
    }
  }, [quantity]);

  const handleBuy = () => {
    if (isLoggedIn) {
      if (isEnoughBalance) {
        createOrder();
      } else setOpenModal(true);
    } else navigate('/login');
  };

  useEffect(() => {
    getWalletInfo();
  }, []);

  const getWalletInfo = useCallback(async () => {
    const res = await walletApi.getWallet(token);
    if (res) {
      setWalletInfo(res);
    }
  }, []);

  const createOrder = useCallback(async () => {
    const res = await orderApi.createOrder(token, {
      merchantId: productDetail?.merchantId || -1,
      currency: 'usd',
      productInformation: {
        productId: productDetail?.id || -1,
        quantity: quantity,
      },
    });

    if (res) {
      setOrderId(Number(res.qrContent) || 0);
    }
  }, [productDetail, quantity]);

  const onChangeNumber = (value: number) => {
    value >= 1 && setQuantity(value);
  };

  useEffect(() => {
    orderId && navigate(`/cart?state=${orderId}`);
  }, [orderId]);

  return (
    <div className="container">
      <div className="product-detail">
        <Breadcrumb />
        <div className="product-detail__container">
          <div className="product-detail__left-side">
            <div className="product-detail__img-container">
              {productDetail ? (
                <img src={productDetail.image} alt="product" />
              ) : (
                <Skeleton.Image className="product__skeleton-img" />
              )}
            </div>
          </div>

          <div className="product-detail__right-side">
            {productDetail ? (
              <>
                <div className="product-detail__header-container">
                  <div className="product-detail__header">{productDetail.name}</div>
                  <RateSummary rateNumber={3.5} />
                </div>

                <div className="product-detail__price">
                  <CoinIcon /> {productDetail.price * quantity}
                </div>

                <div className="product-detail__category-container">
                  <div className="product-detail__quantity">
                    <span>{t('product.detail.quantity')}</span>
                    <CustomInputNumber value={quantity} onChange={onChangeNumber} />
                    <span>12013 {t('product.detail.available')}</span>
                  </div>
                </div>

                <ProductDetailOption handleBuy={handleBuy} />

                <div className="product-detail__warranty">
                  <img src={warrantyIcon} alt="warranty icon" />
                  <span>{t('product.detail.warranty')}</span>
                  <span>3 {t('product.detail.refund_day')}</span>
                </div>
              </>
            ) : (
              <>
                <Skeleton active />
                <Skeleton active />
              </>
            )}
          </div>
        </div>

        <div className="product-detail__container column">
          <div className="product-detail__content">
            <h2 className="product-content__header">{t('product.detail.detail')}</h2>
            <div className="product-content__description">
              {productDetail ? (
                <div className="product-category">
                  <p className="product__category-item">
                    <span>{t('product.detail.type')}</span>
                    <span>{productDetail.category}</span>
                  </p>
                  <p className="product__category-item">
                    <span>{t('product.detail.warehouse')}</span>
                    <span>19408424</span>
                  </p>
                  <p className="product__category-item">
                    <span>{t('product.detail.from')}</span>
                    <span>Hà Nội</span>
                  </p>
                </div>
              ) : (
                <Skeleton active />
              )}
            </div>
          </div>

          <div className="product-detail__content">
            <h2 className="product-content__header">{t('product.detail.description')}</h2>
            {productDetail ? (
              <div className="product-content__description">{productDetail.description}</div>
            ) : (
              <Skeleton active />
            )}
          </div>
        </div>

        <div className="product-detail__container">
          <ProductDetailReview />
        </div>
      </div>

      <ModalComponent
        noFooter
        openModal={openModal}
        title={'Error'}
        onOk={createOrder}
        setOpenModal={setOpenModal}
        description={t('product.detail.alert_modal')}
      />
    </div>
  );
};

export default ProductDetailPage;
