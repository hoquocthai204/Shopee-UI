import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MerchantPage from '../pages/MerchantPage';

export interface MerchantLayoutProps {}

const MerchantLayout: React.FunctionComponent<MerchantLayoutProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<MerchantPage />} />
    </Routes>
  );
};

export default MerchantLayout;
