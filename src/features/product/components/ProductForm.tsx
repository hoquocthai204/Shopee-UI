import { Button, Form, Input, Modal } from 'antd';
import merchantApi from 'api/merchantApi';
import productApi from 'api/productApi';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useRef } from 'react';
import { productFormField } from '../pages/ProductPage';

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

  const handleCreate = (data: ProductInfo) => {
    createProduct(data);
  };

  const handleUpdate = (data: ProductInfo) => {
    updateProduct(productUpdateField?.id, data);
  };

  const createProduct = useCallback(async (data: ProductInfo) => {
    const merchant = await merchantApi.getMerchant(token);

    const res = await productApi.createProduct(token, {
      ...data,
      images: [data.images.toString()],
      merchantId: Number(merchant.id),
    });

    if (res) {
      setOpenModal(false);
      getProduct();
    }
  }, []);

  const updateProduct = useCallback(async (id, data: ProductInfo) => {
    await productApi.updateProduct(token, id, {
      name: data.name || productUpdateField?.name || '',
      description: data.description || productUpdateField?.description || '',
      images: [data.images.toString() || productUpdateField?.images[0] || ''],
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

  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
      >
        <h1>{isUpdateForm ? 'Edit Product' : 'Create Product'}</h1>
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
              <Button type="primary" size={'large'} block danger htmlType="submit">
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

            <Form.Item>
              <Button type="primary" size={'large'} block danger htmlType="submit">
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
