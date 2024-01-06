import { ChatIcon } from 'components/Icons';
import { LandingLayout } from 'components/Layout';
import AuthPage from 'features/auth/pages/AuthPage';
import CartPage from 'features/cart/pages/CartPage';
import CheckoutPage from 'features/checkout/pages/CheckoutPage';
import RechargeLayout from 'features/excharge/pages/RechargeLayout';
import LandingPage from 'features/landing/pages/LandingPage';
import MerchantLayout from 'features/merchant/layout/MerchantLayout';
import ProductLayout from 'features/product/layout/ProductLayout';
import NotFoundPage from 'features/static/pages/NotFoundPage';
import TransactionPage from 'features/transaction/pages/TransactionPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export interface AppProps {}

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<LandingLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="recharge/*" element={<RechargeLayout />} />
          <Route path="merchant/*" element={<MerchantLayout />} />
          <Route path="products/*" element={<ProductLayout />} />
          <Route path="transaction-history" element={<TransactionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="login" element={<AuthPage isLogin />} />
        <Route path="register" element={<AuthPage />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <div className="support-chat">
        <ChatIcon fill="#ee4d2d" />
        <span>Chat</span>
      </div>
    </>
  );
};

export default App;
