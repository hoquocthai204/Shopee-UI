import { Button, Form, Input, Modal, Upload } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { UploadOutlined } from '@ant-design/icons';
import imageApi from 'api/imageApi';
import merchantApi from 'api/merchantApi';
import productApi from 'api/productApi';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { productFormField } from '../pages/ProductPage';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

interface ProductFormProps {
  visible: boolean;
  rules?: true;
  isUpdate: boolean;
  setOpenModal: (value: boolean) => void;
  getProduct: () => void;
}

const ProductForm: React.FunctionComponent<ProductFormProps> = ({
  visible,
  isUpdate,
  setOpenModal,
  getProduct,
}) => {
  const token = useRef(localStorage.getItem('token')).current || '';
  const [form] = useForm();
  const location = useLocation();
  const [productUpdateId, setProductUpdateId] = useState<number | null>(null);
  const [productUpdateData, setProductUpdateData] = useState<ProductInfo>();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleCreate = (data: ProductInfo) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file.originFileObj);
    });
    formData.append('upload_preset', 'mfs2nd1f');

    createProduct(data, formData);
  };

  useEffect(() => {
    visible &&
      isUpdate &&
      location.search &&
      setProductUpdateId(Number(queryString.parse(location.search)['edit-id']));
  }, [visible]);

  useEffect(() => {
    productUpdateId && getUpdateData(productUpdateId);
  }, [visible, productUpdateId]);

  const getUpdateData = useCallback(async (id: number) => {
    const res = await productApi.getProduct(id);
    if (res) {
      setProductUpdateData(res);
    }
  }, []);

  const handleUpdate = (data: ProductInfo) => {
    updateProduct(productUpdateData, data);
  };

  const createProduct = useCallback(async (data: ProductInfo, formData) => {
    const merchant = await merchantApi.getMerchant(token);

    imageApi.uploadImage(formData).then(async (response) => {
      const res = await productApi.createProduct(token, {
        ...data,
        image: response.data.secure_url,
        merchantId: Number(merchant.id),
      });

      if (res) {
        setOpenModal(false);
        getProduct();
      }
      form.resetFields();
    });
  }, []);

  const updateProduct = useCallback(async (productUpdateData, data: ProductInfo) => {
    await productApi.updateProduct(token, productUpdateData.id, {
      ...data,
      image: productUpdateData?.image,
    });

    setOpenModal(false);
    getProduct();
  }, []);

  const cloneUpdateData = () => {
    let newData = { ...productUpdateData };
    delete newData?.id;
    delete newData?.merchantId;
    delete newData?.image;
    return newData;
  };

  const handleFileChange = (info: any) => {
    setFileList(info.fileList);
  };

  useEffect(() => {
    if (!visible) {
      setFileList([]);
      form.resetFields();
    }
  }, [visible]);

  useEffect(() => {
    productUpdateId && console.log(productUpdateId);
  }, [productUpdateId]);

  useEffect(() => {
    visible && isUpdate && productUpdateData && form.setFieldsValue(cloneUpdateData());
  }, [visible, isUpdate, productUpdateData]);

  return (
    <Modal
      visible={visible}
      footer={null}
      centered
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      className="product__modal"
    >
      <p className="product__modal-header">{isUpdate ? 'Edit Product' : 'Create Product'}</p>
      {isUpdate && productUpdateData ? (
        <Form
          form={form}
          name="product"
          layout="vertical"
          onFinish={(data) => handleUpdate(data)}
          autoComplete="off"
          className="product__form"
        >
          {Object.values(productFormField).map((e, i) => (
            <Form.Item key={i} label={e} name={Object.keys(productFormField)[i]}>
              <Input />
            </Form.Item>
          ))}

          <Form.Item>
            <Button
              className="product__submit-btn"
              type="primary"
              size={'large'}
              block
              danger
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          name="product"
          initialValues={{}}
          layout="vertical"
          onFinish={handleCreate}
          autoComplete="off"
          className="product__form"
          form={form}
        >
          {Object.values(productFormField).map((e, i) => (
            <Form.Item
              key={i}
              label={e}
              name={Object.keys(productFormField)[i]}
              rules={[{ required: true, message: `${e} is required` }]}
            >
              <Input />
            </Form.Item>
          ))}

          <Form.Item label={'Image'} name="image">
            <Upload
              beforeUpload={() => false}
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              className="product__submit-btn"
              type="primary"
              size={'large'}
              block
              danger
              htmlType="submit"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ProductForm;
