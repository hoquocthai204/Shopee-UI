import { Button, Form, Input, Modal, Upload, message } from 'antd';
import merchantApi from 'api/merchantApi';
import productApi from 'api/productApi';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { productFormField } from '../pages/ProductPage';
import { UploadFile } from 'antd/lib/upload/interface';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';

interface ProductFormProps {
  visible: boolean;
  rules?: true;
  isUpdateForm: boolean;
  setOpenModal: (value: boolean) => void;
  getProduct: () => void;
  productUpdateField?: ProductInfo;
}

const ProductForm: React.FunctionComponent<ProductFormProps> = ({
  visible,
  rules,
  isUpdateForm,
  setOpenModal,
  getProduct,
  productUpdateField,
}) => {
  const token = useRef(localStorage.getItem('token')).current || '';
  const [imageUrl, setImageUrl] = useState<any>(null);
  // const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const handleCreate = (data: ProductInfo) => {
    const dataSend = {
      ...data,
      images: [imageUrl],
    };
    createProduct(dataSend);
  };

  const handleUpdate = (data: ProductInfo) => {
    // updateProduct(productUpdateField?.id, data);
  };

  const createProduct = useCallback(async (data: ProductInfo) => {
    const merchant = await merchantApi.getMerchant(token);
    console.log({
      ...data,
      // images: imageUrl,
      merchantId: Number(merchant.id),
    });
    const res = await productApi.createProduct(token, {
      ...data,
      // images: imageUrl,
      merchantId: Number(merchant.id),
    });

    if (res) {
      setOpenModal(false);
      getProduct();
    }
    form.resetFields();
  }, []);

  const updateProduct = useCallback(async (id, data: ProductInfo) => {
    await productApi.updateProduct(token, id, {
      name: data.name || productUpdateField?.name || '',
      description: data.description || productUpdateField?.description || '',
      images: [data.images.fileList[0].toString() || productUpdateField?.images.fileList[0] || ''],
      price: data.price || productUpdateField?.price || -1,
      category: data.category || productUpdateField?.category || '',
    });
    setOpenModal(false);
    getProduct();
  }, []);

  const cloneUpdateData = () => {
    let newData = { ...productUpdateField };
    delete newData?.id;
    delete newData?.merchantId;
    return newData;
  };

  const handleFileChange = (info: any) => {
    setImageUrl(URL.createObjectURL(info.file));
  };

  const handleRemove = () => {
    setImageUrl('');
  };

  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        centered
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        className="product__modal"
      >
        <p className="product__modal-header">{isUpdateForm ? 'Edit Product' : 'Create Product'}</p>
        {isUpdateForm && productUpdateField ? (
          <Form
            name="product"
            initialValues={productUpdateField && cloneUpdateData()}
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

            <Form.Item label={'Image'}>
              <Upload
                onRemove={handleRemove}
                onChange={handleFileChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} style={{ padding: '8px' }}>
                  Upload
                </Button>
              </Upload>
              {imageUrl && <img style={{ width: '100%' }} src={imageUrl} alt="Uploaded" />}
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
    </>
  );
};

export default ProductForm;
