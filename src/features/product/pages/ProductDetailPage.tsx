import orderApi from 'api/orderApi';
import productApi from 'api/productApi';
import walletApi from 'api/walletApi';
import warrantyIcon from 'assets/images/warranty_icon.png';
import Breadcrumb from 'components/Common/Breadcrumb';
import { ModalComponent } from 'components/Common/ModalComponent';
import { CoinIcon } from 'components/Icons/CoinIcon';
import { ProductInfo } from 'models/product/productInfo';
import { WalletInformation } from 'models/wallet/walletInformation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomInputNumber from '../components/CustomInputNumber';
import ProductDetailOption from '../components/ProductDetailOption';
import RateSummary from '../components/RateSummary';
import ProductDetailReview from '../components/ProductDetailReview';
import { useAppSelector } from 'app/hooks';
import { selectIsLoggedIn } from 'features/auth/authSlice';

interface ProductDetailPageProps {}

const ProductDetailPage: React.FunctionComponent<ProductDetailPageProps> = (props) => {
  const [productDetail, setProductDetail] = useState<ProductInfo>();
  const token = useRef(localStorage.getItem('token')).current || '';
  const [quantity, setQuantity] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [walletInfo, setWalletInfo] = useState<WalletInformation>();
  const [isEnoughBalance, setIsEnoughBalance] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number | boolean>(false);
  const locate = useLocation();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const productId = Number(locate.pathname.split('/')[2]);
    getProductDetail(productId);
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
    isLoggedIn ? setOpenModal(true) : navigate('/login');
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

  return (
    <div className="container">
      <div className="product-detail">
        <Breadcrumb />
        {productDetail && (
          <>
            <div className="product-detail__container">
              <div className="product-detail__left-side">
                <div className="product-detail__img-container">
                  <img src={productDetail.image} alt="product" />
                </div>
              </div>

              <div className="product-detail__right-side">
                <div className="product-detail__header-container">
                  <div className="product-detail__header">{productDetail.name}</div>
                  <RateSummary rateNumber={3.5} />
                </div>

                <div className="product-detail__price">
                  <CoinIcon /> {productDetail.price * quantity}
                </div>

                <div className="product-detail__category-container">
                  <div className="product-detail__quantity">
                    <span>Số Lượng</span>
                    <CustomInputNumber value={quantity} onChange={onChangeNumber} />
                    <span>12013 sản phẩm có sẵn</span>
                  </div>
                </div>

                <ProductDetailOption handleBuy={handleBuy} />

                <div className="product-detail__warranty">
                  <img src={warrantyIcon} alt="warranty icon" />
                  <span>Shopee Đảm Bảo</span>
                  <span>3 Ngày Trả Hàng / Hoàn Tiền</span>
                </div>
              </div>
            </div>

            <div className="product-detail__container column">
              <div className="product-detail__content">
                <h2 className="product-content__header">CHI TIẾT SẢN PHẨM</h2>
                <div className="product-content__description">
                  <div className="product-category">
                    <p className="product__category-item">
                      <span>Danh Mục</span>
                      <span>{productDetail.category}</span>
                    </p>
                    <p className="product__category-item">
                      <span>Kho hàng</span>
                      <span>19408424</span>
                    </p>
                    <p className="product__category-item">
                      <span>Gửi từ</span>
                      <span>Hà Nội</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="product-detail__content">
                <h2 className="product-content__header">MÔ TẢ SẢN PHẨM</h2>
                <div className="product-content__description">{productDetail.description}</div>
              </div>
            </div>

            <div className="product-detail__container">
              <ProductDetailReview />
            </div>
          </>
        )}
      </div>

      <ModalComponent
        openModal={openModal}
        title={isEnoughBalance ? 'Buy Product' : 'Error'}
        onOk={isEnoughBalance ? () => createOrder() : () => {}}
        setOpenModal={setOpenModal}
        description={
          isEnoughBalance ? 'Confirm to buy this product?' : 'No enough balance to buy this product'
        }
      />

      <ModalComponent
        noFooter
        title="Scan QR code to continue"
        openModal={orderId ? true : false}
        onOk={isEnoughBalance ? () => createOrder() : () => {}}
        setOpenModal={setOrderId}
        description={
          <div style={{ height: 'auto', margin: '0 auto', maxWidth: 200, width: '100%' }}>
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={orderId.toString()}
              viewBox={`0 0 256 256`}
            />
          </div>
        }
      />
    </div>
  );
};

export default ProductDetailPage;
