import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import merchantApi from 'api/merchantApi';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import { MerchantInfo } from 'models/merchant/merchantInfo';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MerchantPageProps {}

const formData = {
  businessName: 'Business Name',
  businessIndustry: 'Business Industry',
  mccCode: 'Mcc Code',
  businessPlace: 'Business Place',
  serviceDescription: 'Service Description',
  storeType: 'Store Type',
  websiteUrl: 'Website Url',
  storeAddress: 'Store Address',
  storePhoto: 'Store Photo',
  annualPayment: 'Annual Payment',
  monthlyPayment: 'Monthly Payment',
  ortherAmount: 'Orther Amount',
  monthlyTxnNumber: 'Monthly Transaction Number',
  averageDeliveryTime: 'Average Delivery Time',
};

const MerchantPage: React.FunctionComponent<MerchantPageProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: MerchantInfo) => {
    setOpen(true);
    registerMerchant(data);
  };

  const registerMerchant = useCallback(async (data: MerchantInfo) => {
    const token = localStorage.getItem('token') || '';
    const res = await merchantApi.registerMerchant(token, data);
    if (res) {
      setOpen(true);
      dispatch(authActions.setIsMerchant(true));
    }
  }, []);

  return (
    <div className="container">
      <div className="merchant">
        <p className="merchant__header">Register Merchant</p>
        <Form
          name="recharge"
          initialValues={{}}
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="off"
          className="merchant__form"
        >
          {Object.values(formData).map((e, i) => (
            <Form.Item
              label={e}
              name={Object.keys(formData)[i]}
              rules={[{ required: true, message: `${e} is required` }]}
              className="merchant__input-container"
            >
              <Input />
            </Form.Item>
          ))}

          <Form.Item>
            <Button
              className="merchant__submit-btn"
              type="primary"
              size={'large'}
              block
              danger
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <Modal
          title="Success"
          centered
          visible={open}
          footer={[
            <Button
              key="back"
              size={'large'}
              type={'primary'}
              onClick={() => {
                setOpen(false);
                navigate('/');
              }}
            >
              Return
            </Button>,
          ]}
        >
          <p>
            <CheckCircleFilled style={{ color: '#00F295' }} />{' '}
            <span>Success to register Merchant</span>
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default MerchantPage;
