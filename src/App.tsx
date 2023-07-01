import { LandingLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
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
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
