import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RechargePage from '../components/RechargePage';
import RechargeSuccess from '../components/RechargeSuccess';

export interface RechargeLayoutProps {}

const RechargeLayout: React.FunctionComponent<RechargeLayoutProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<RechargePage />} />
      <Route path="success" element={<RechargeSuccess />} />
    </Routes>
  );
};

export default RechargeLayout;
