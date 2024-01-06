import { Button, Form, Input } from 'antd';
import paymentApi from 'api/paymentApi';
import { CoinIcon } from 'components/Icons';
import React, { useCallback } from 'react';

export interface RechargePageProps {}

const initialValue = {
  amount: '',
};

const RechargePage: React.FunctionComponent<RechargePageProps> = (props) => {
  const onSubmit = (values: any) => {
    createCheckout(Number(values.amount));
  };

  const createCheckout = useCallback(async (amount: number) => {
    const res = await paymentApi.createStripePayment(
      {
        successUrl: `${process.env.REACT_APP_HOST_URL}recharge/success`,
        cancelUrl: `${process.env.REACT_APP_HOST_URL}recharge`,
        lineItems: [
          {
            quantity: amount,
            priceData: {
              currency: 'usd',
              unitAmount: 100,
              productData: {
                name: 'USDC',
                description: 'USD Coin',
                images: [
                  'https://www.pngall.com/wp-content/uploads/10/USD-Coin-Logo-PNG-Images.png',
                ],
              },
            },
          },
        ],
      },
      localStorage.getItem('token') || ''
    );

    if (res.url) {
      localStorage.setItem('checkoutSessionId', res.sessionId);
      window.open(res.url, '_self');
    }
  }, []);
  return (
    <div className="container">
      <div className="recharge">
        <p className="recharge__header">Recharge</p>
        <Form
          name="recharge"
          initialValues={initialValue}
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="off"
          className="recharge__form"
        >
          <Form.Item
            label="Deposit amount"
            name="amount"
            rules={[{ required: true, message: 'Please input amount!' }]}
          >
            <div className="rechange__input-container">
              <Input type="number" /> <CoinIcon />
            </div>
          </Form.Item>

          <Form.Item>
            <Button className="recharge__submit-btn" type="primary" block danger htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RechargePage;
