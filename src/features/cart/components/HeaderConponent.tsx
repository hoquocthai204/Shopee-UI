import HeaderTopNav from 'components/Common/HeaderTopNav';
import { SearchIcon, ShopeeLogo } from 'components/Icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderConponentProps {}

const HeaderConponent: React.FunctionComponent<HeaderConponentProps> = (props) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate('/');
  };

  return (
    <>
      <HeaderTopNav />
      <div className="header">
        <div className="container">
          <div className="cart-logo__wrapper">
            <ShopeeLogo onClick={handleNav} />
            <div className="cart-logo__page-name">Giỏ hàng</div>
          </div>

          <div className="cart-page-searchbar">
            <input type="text" placeholder="SĂN SHOPEE LIVE -50%" />
            <button>
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderConponent;
