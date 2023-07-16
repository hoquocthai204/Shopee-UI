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
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const handleCreate = (data: ProductInfo) => {
    createProduct(data);
  };

  const handleUpdate = (data: ProductInfo) => {
    updateProduct(productUpdateField?.id, data);
  };

  const createProduct = useCallback(async (data: ProductInfo) => {
    console.log(data);
    const merchant = await merchantApi.getMerchant(token);
    const res = await productApi.createProduct(token, {
      ...data,
      images: [imageUrl],
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

  const handleImageChange = (e: any) => {
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageUpload = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      getBase64(info.file.originFileObj, (imageUrl: string) => setImageUrl(imageUrl));
    }
    if (info.file.status === 'error') {
      setLoading(false);
      message.error('Upload failed');
    }
  };

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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

            <Form.Item
              label={'Image'}
              name={'images'}
              rules={[{ required: true, message: `${'Image'} is required` }]}
            >
              <Upload listType="picture-card" showUploadList={false} onChange={handleImageUpload}>
                {imageUrl ? (
                  <img src={imageUrl} alt="Uploaded" style={{ width: '100%' }} />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>

              {/* <input type="file" style={{ padding: '8px' }} onChange={handleImageChange} />
              {imageUrl && <img style={{ width: '100%' }} src={imageUrl} alt="product-img" />} */}
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
