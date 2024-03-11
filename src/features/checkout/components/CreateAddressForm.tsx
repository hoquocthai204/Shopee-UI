import { Button, Form, Input, Tabs } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { locationApi } from 'api/locationApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { checkoutActions, selectUpdateAddressSelected } from '../checkoutSlice';
import { addressApi } from 'api/addressApi';
import { AddressRequest, AddressResponse } from 'models';

interface CreateAddressFormProps {}

const CreateAddressForm: React.FunctionComponent<CreateAddressFormProps> = (props) => {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState<string>('1');

  const [provinces, setProvinces] = useState<any>(null);
  const [districts, setDistricts] = useState<any>(null);
  const [wards, setWards] = useState<any>(null);

  const [province, setProvince] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const [addressData, setAddressData] = useState<AddressResponse>();
  const updateAddressSelected = useAppSelector(selectUpdateAddressSelected);
  const token = localStorage.getItem('token') || '';
  const [form] = useForm();
  const dispatch = useAppDispatch();

  const handleAddress = (data: any) => {
    if (!updateAddressSelected) {
      createAddress(data);
      dispatch(checkoutActions.setisModifyAddressStep(false));
    } else {
      updateAddress(updateAddressSelected, data);
      dispatch(checkoutActions.setisModifyAddressStep(false));
      dispatch(checkoutActions.setUpdateAddressSelected(null));
    }
  };

  const getProvincesData = useCallback(async () => {
    try {
      const res = await locationApi.getProvinces();
      if (res) setProvinces(res.data);
    } catch (error) {}
  }, []);
  const getDistrictsData = useCallback(async (provinceId) => {
    try {
      const res = await locationApi.getDistricts(provinceId);
      if (res) setDistricts(res.data);
    } catch (error) {}
  }, []);
  const getWardData = useCallback(async (districtId) => {
    try {
      const res = await locationApi.getWards(districtId);
      if (res) setWards(res.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getProvincesData();
    if (updateAddressSelected) {
      getAddressData(updateAddressSelected);
    }
  }, []);

  const updateAddress = useCallback(async (id: number, data: AddressRequest) => {
    await addressApi.updateAddress(id, data);
  }, []);

  const createAddress = useCallback(async (data) => {
    await addressApi.createAddress(data, token);
  }, []);

  const getAddressData = useCallback(async (id) => {
    const res = await addressApi.getAddress(id);
    res && setAddressData(res);
  }, []);

  useEffect(() => {
    form.setFieldsValue(addressData);

    return () => {
      form.resetFields();
    };
  }, [addressData]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAddress}
      autoComplete="off"
      className="address-form"
    >
      <div className="address-form__field">
        <Form.Item name={'userName'} rules={[{ required: true }]}>
          <Input placeholder="Họ và Tên" />
        </Form.Item>

        <Form.Item name={'phoneNumber'} rules={[{ required: true }]}>
          <Input placeholder="Số điện thoại" />
        </Form.Item>
      </div>

      <div className="address-form__field">
        <Form.Item name={'address'} rules={[{ required: true }]}>
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
          {provinces &&
            provinces.results.map((e: any) => (
              <li
                key={e.province_id}
                onClick={() => {
                  setProvince(e.province_name);
                  getDistrictsData(e.province_id);
                  setActiveKey('2');
                  form.setFieldsValue({ address: e.province_name });
                }}
              >
                {e.province_name}
              </li>
            ))}
        </TabPane>

        <TabPane tab="Quận/Huyện" key="2" disabled={!province}>
          {districts &&
            districts.results.map((e: any) => (
              <li
                onClick={() => {
                  setDistrict(e.district_name);
                  getWardData(e.district_id);
                  setActiveKey('3');
                  form.setFieldsValue({ address: `${province}, ${e.district_name}` });
                }}
                key={e.district_id}
              >
                {e.district_name}
              </li>
            ))}
        </TabPane>

        <TabPane tab="Phường/Xã" key="3" disabled={!district}>
          {wards &&
            wards.results.map((e: any) => (
              <li
                onClick={() => {
                  setActiveKey('1');
                  form.setFieldsValue({
                    address: `${province}, ${district}, ${e.ward_name}`,
                  });
                }}
                key={e.ward_id}
              >
                {e.ward_name}
              </li>
            ))}
        </TabPane>
      </Tabs>

      <div className="address-form__field">
        <Form.Item name={'detailAddress'} rules={[{ required: true }]}>
          <Input placeholder="Địa chỉ cụ thể" />
        </Form.Item>
      </div>

      <div className="address-form__options">
        <Button
          danger
          ghost
          onClick={() => dispatch(checkoutActions.setisModifyAddressStep(false))}
        >
          Trở Lại
        </Button>

        <Button danger type="primary" htmlType="submit">
          Xác nhận
        </Button>
      </div>
    </Form>
  );
};

export default CreateAddressForm;
