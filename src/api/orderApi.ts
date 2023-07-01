import { OrderInformation } from 'models/order/orderInformation';
import axiosClient, { config } from './axiosClient';

const orderApi = {
  createOrder(token: string, data: OrderInformation): Promise<OrderInformation> {
    const url = `/orders`;
    return axiosClient.post(url, data, config(token));
  },
};

export default orderApi;
