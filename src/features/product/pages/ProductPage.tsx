import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import productApi from 'api/productApi';
import { ModalComponent } from 'components/Common/ModalComponent';
import { ProductInfo } from 'models/product/productInfo';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ProductForm from '../components/ProductForm';

interface ProductPageProps {}

export const productFormField = {
  name: 'Name',
  description: 'Description',
  // images: 'images',
  price: 'Price',
  category: 'Category',
};

const ProductPage: React.FunctionComponent<ProductPageProps> = (props) => {
  const [productInfo, setProductInfo] = useState<ProductInfo[] | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productDeleteSelected, setProductDeleteSelected] = useState<number | undefined>(0);
  const token = useRef(localStorage.getItem('token')).current || '';
  const [productUpdateField, setProductUpdateField] = useState<ProductInfo>();

  const getProduct = useCallback(async () => {
    const res = await productApi.getAllPrivateProduct(localStorage.getItem('token') || '');
    if (res) setProductInfo(res);
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const handleToggleModal = () => {
    setOpenCreateModal(true);
  };

  const handleEdit = (id: number | undefined) => {
    getProductDetail(id);
    setOpenEditModal(true);
  };

  const handleDelete = (id: number | undefined) => {
    setProductDeleteSelected(id);
    setOpenDeleteModal(true);
  };

  const deleteProduct = useCallback(async (id) => {
    await productApi.deleteProduct(token, id);
    getProduct();
  }, []);

  const getProductDetail = useCallback(async (id) => {
    const res = await productApi.getProduct(id);
    if (res) {
      setProductUpdateField(res);
    }
  }, []);

  return (
    <div className="container">
      <div className="product-content">
        <div className="product-content__header">
          <span>LIST PRODUCT</span>
        </div>

        <div className="product__button-container">
          <Button
            type={'primary'}
            onClick={handleToggleModal}
            danger
            size={'large'}
            className="product__create-btn"
          >
            Create Product
          </Button>
        </div>

        <div className="product__list-items">
          {productInfo &&
            productInfo.map((e, i) => (
              <Card
                key={e.id}
                style={{ width: 190 }}
                hoverable
                actions={[
                  <EditOutlined onClick={() => handleEdit(e.id)} key="edit" />,
                  <DeleteOutlined onClick={() => handleDelete(e.id)} key="delete" />,
                ]}
                cover={<img alt="example" src={''.toString()} />}
              >
                <Meta title={e.name} description={e.price} />
              </Card>
            ))}
        </div>

        <ProductForm
          visible={openCreateModal}
          setOpenModal={setOpenCreateModal}
          getProduct={getProduct}
          isUpdateForm={false}
          rules
        />

        <ProductForm
          visible={openEditModal}
          setOpenModal={setOpenEditModal}
          getProduct={getProduct}
          isUpdateForm={true}
          productUpdateField={productUpdateField}
        />

        <ModalComponent
          openModal={openDeleteModal}
          title={'Delete Product'}
          onOk={() => deleteProduct(productDeleteSelected)}
          setOpenModal={setOpenDeleteModal}
          description={'Do you want to delete this product'}
        />
      </div>
    </div>
  );
};

export default ProductPage;
