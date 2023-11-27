import { Rate } from 'antd';
import { AvatarIcon } from 'components/Icons';
import React, { useState } from 'react';

interface ProductDetailReviewProps {}

const overviewArr = [
  'tất cả',
  '5 Sao (3,9k)',
  '4 Sao (378)',
  '3 Sao (135)',
  '2 Sao (47)',
  '1 Sao (119)',
  'Có Bình luận (1,8k)',
  'Có hình ảnh / video (861)',
];

const ProductDetailReview: React.FunctionComponent<ProductDetailReviewProps> = (props) => {
  const [starSelected, setStarSelected] = useState<number>(0);

  const handleSelect = (val: number) => {
    setStarSelected(val);
  };
  return (
    <div className="review">
      <div className="review__title">ĐÁNH GIÁ SẢN PHẨM</div>
      <div className="review__rate-container">
        <div className="review__rate">
          <div className="review__score-wrapper">
            <span className="review__rating-score">4.5</span> trên 5
          </div>
          <Rate allowHalf disabled value={4.5} />
        </div>

        <ul className="review__rate-detail">
          {overviewArr.map((e, i) => (
            <li
              key={i}
              className={`review__rate-item ${starSelected === i && 'review__rate-item--active'}`}
              onClick={() => handleSelect(i)}
            >
              {e}
            </li>
          ))}
        </ul>
      </div>

      <div className="review__comment-list">
        {[1, 2, 3].map((e, i) => (
          <div key={i} className="review__comment-item">
            <div className="review__avatar-wrapper">
              {/* <img src="" alt="avatar" /> */}
              <AvatarIcon />
            </div>

            <div className="review__main">
              <span className="review__author-name">o_f12fbjm5</span>
              <div className="review__star-rate">
                <Rate allowHalf value={4.5} disabled />
              </div>
              <p className="review__rate-time">2022-06-08 13:36 | Phân loại hàng: l4 đủ phụ kiện</p>
              <p className="review__comment-content">
                Chất lượng tốt,sản phẩm tuyệt vời!!! Đóng gói chắc chắn mọi người lên mua cho mình 1
                cái nhé!!!! Sẽ luôn ủng hộ shop!!!
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailReview;
