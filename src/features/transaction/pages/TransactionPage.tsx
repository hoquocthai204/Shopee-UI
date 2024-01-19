import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import transactionApi from 'api/transactionApi';
import { CoinIcon } from 'components/Icons/CoinIcon';
import { ProductInfo } from 'models/product/productInfo';
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface TransactionPageProps {}
interface DataType {
  key: number;
  image: string;
  productInformation: ProductInfo;
  quantity: number;
  totalAmount: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: 'image',
    width: '25%',
    render: (value) => (
      <div className="transaction__img-container">
        <img src={value} alt="" />
      </div>
    ),
    align: 'center',
  },
  {
    title: 'Product Information',
    dataIndex: 'productInformation',
    width: '25%',
    render: (value: ProductInfo) => {
      return (
        <div className="transaction__content">
          <span>{value?.name}</span>
          <span>{value?.description}</span>
        </div>
      );
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    sorter: {
      compare: (a, b) => a.quantity - b.quantity,
    },
    render: (value: number) => <span>x {value}</span>,
    width: '25%',
  },
  {
    title: 'Total Price',
    dataIndex: 'totalAmount',
    sorter: {
      compare: (a, b) => a.totalAmount - b.totalAmount,
    },
    render: (value: number) => (
      <span>
        <CoinIcon /> {value}
      </span>
    ),
    width: '25%',
  },
];

const TransactionPage: React.FunctionComponent<TransactionPageProps> = (props) => {
  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {};
  const token = useRef(localStorage.getItem('token')).current;

  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    getTransactionHistory();
  }, []);

  const getTransactionHistory = useCallback(async () => {
    const res = await transactionApi.getAllTransaction(token || '');
    if (res) {
      const newData = res.map((e) => ({
        key: e.orderInfo.id,
        image: e.orderInfo.productInfo.image,
        productInformation: e.orderInfo.productInfo,
        quantity: Math.abs(e.amount) / e.orderInfo.productInfo.price,
        totalAmount: Math.abs(e.amount),
      }));
      setData(newData);
    }
  }, []);

  return (
    <div className="container">
      <div className="transaction">
        <div className="transaction__header">Transaction History</div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </div>
    </div>
  );
};

export default TransactionPage;
