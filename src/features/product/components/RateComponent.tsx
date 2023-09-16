import React from 'react';
import { Rate } from 'antd';
import { StarFilled } from '@ant-design/icons';

interface RateComponentProps {
  rateNumber: number;
}

const RateComponent: React.FunctionComponent<RateComponentProps> = ({ rateNumber }) => {
  return (
    <div className="rate-container">
      <div className="rate__star">
        <span className="rate__amount">{rateNumber}</span>
        <Rate allowHalf disabled value={rateNumber} character={<StarFilled />} />
      </div>
    </div>
  );
};

export default RateComponent;
