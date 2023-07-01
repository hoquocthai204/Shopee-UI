import React from 'react';
import shopLogo from 'assets/images/shop_logo.png';
import { useNavigate } from 'react-router-dom';

export interface MainLogoProps {}

export const MainLogo = (props: MainLogoProps) => {
  const navigate = useNavigate();
  return (
    <span className="shop-logo" onClick={() => navigate('')}>
      <img src={shopLogo} alt="shopeeLogo" />
      <span>Shopee</span>
    </span>
  );
};
