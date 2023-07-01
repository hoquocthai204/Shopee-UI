import { TransactionInfo } from 'models/transaction/transactionInfo';
import axiosClient, { config } from './axiosClient';

const transactionApi = {
  getAllTransaction(token: string): Promise<TransactionInfo[]> {
    const url = `/transactions`;
    return axiosClient.get(url, config(token));
  },
};

export default transactionApi;
