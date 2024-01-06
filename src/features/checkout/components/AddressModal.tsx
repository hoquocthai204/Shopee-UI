import { Button, Form, Input, Modal, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { locationApi } from 'api/locationApi';
import React, { useCallback, useEffect, useState } from 'react';

interface AddressModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const { TabPane } = Tabs;

const AddressModal: React.FunctionComponent<AddressModalProps> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState<string>('1');
  const [locationData, setLocationData] = useState<any>(null);
  const [province, setProvince] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [form] = useForm();

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
    }, 1000);
  };

  const handleAddress = (data: any) => {
    console.log(data);
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const getLocationData = useCallback(async () => {
    try {
      const res = await locationApi.getVNLocation();
      if (res) setLocationData(res.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    isOpen && getLocationData();
    !isOpen && form.resetFields();
  }, [isOpen]);

  return (
    <Modal
      visible={isOpen}
      centered
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      className="address-modal"
      footer={[
        <Button key="back" danger ghost onClick={() => setIsOpen(false)}>
          Hủy
        </Button>,
        <Button key="submit" danger type="primary" loading={loading} onClick={handleOk}>
          Xác nhận
        </Button>,
      ]}
    >
      <div className="address-wrapper">
        <p className="address-title">Địa Chỉ Người Nhận</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleAddress}
        autoComplete="off"
        className="address-form"
      >
        <div className="address-form__field">
          <Form.Item name={'userName'}>
            <Input placeholder="Họ và Tên" />
          </Form.Item>

          <Form.Item name={'userPhone'}>
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </div>

        <div className="address-form__field">
          <Form.Item name={'address'}>
            <Input placeholder={'Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã'} allowClear />
          </Form.Item>
        </div>

        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          onChange={(val) => setActiveKey(val)}
          className="address-form__tabs"
          centered
        >
          <TabPane tab="Tỉnh/ Thành phố" key="1" className="address-form__tab">
            {locationData &&
              locationData.map((e: any) => (
                <li
                  key={e.code}
                  onClick={() => {
                    setProvince(e.name);
                    setActiveKey('2');
                    form.setFieldsValue({ address: e.name });
                  }}
                >
                  {e.name}
                </li>
              ))}
          </TabPane>

          <TabPane tab="Quận/Huyện" key="2" disabled={!province}>
            {locationData &&
              locationData
                .filter((val: any) => val.name === province)
                .map((e: any) =>
                  e.districts.map((i: any) => (
                    <li
                      onClick={() => {
                        setDistrict(i.name);
                        setActiveKey('3');
                        form.setFieldsValue({ address: `${province}, ${i.name}` });
                      }}
                      key={i.code}
                    >
                      {i.name}
                    </li>
                  ))
                )}
          </TabPane>

          <TabPane tab="Phường/Xã" key="3" disabled={!district}>
            {locationData &&
              locationData
                .filter((val: any) => val.name === province)
                .map((e: any) =>
                  e.districts
                    .filter((val: any) => val.name === district)
                    .map((i: any) =>
                      i.wards.map((j: any) => (
                        <li
                          onClick={() => {
                            setActiveKey('1');
                            form.setFieldsValue({
                              address: `${province}, ${district}, ${j.name}`,
                            });
                          }}
                          key={j.code}
                        >
                          {j.name}
                        </li>
                      ))
                    )
                )}
          </TabPane>
        </Tabs>

        <div className="address-form__field">
          <Form.Item name={'detailAddress'}>
            <Input placeholder="Địa chỉ cụ thể" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddressModal;
