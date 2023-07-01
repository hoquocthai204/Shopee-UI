import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface RechargeSuccessProps {}

const RechargeSuccess: React.FunctionComponent<RechargeSuccessProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="recharge">
        <p className="recharge__header">Recharge</p>
        <div className="recharge__content">
          <p>
            <CheckCircleFilled style={{ color: '#00F295' }} />
            Successfully recharged
          </p>
          <Button onClick={() => navigate('/')} type="primary" size={'large'} block>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RechargeSuccess;
