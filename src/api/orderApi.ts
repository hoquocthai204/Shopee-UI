import { OrderCreateInformation } from 'models/order/orderCreateInformation';
import { OrderGetInformation } from 'models/order/orderGetInformation';
import axiosClient, { config } from './axiosClient';

const orderApi = {
  createOrder(token: string, data: OrderCreateInformation): Promise<OrderCreateInformation> {
    const url = `/orders`;
    return axiosClient.post(url, data, config(token));
  },
  getOrder(token: string, id: number): Promise<OrderGetInformation> {
    const url = `/orders/${id}`;
    return axiosClient.get(url, config(token));
  },
};

export default orderApi;
