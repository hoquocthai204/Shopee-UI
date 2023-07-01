import { MerchantInfo } from 'models/merchant/merchantInfo';
import axiosClient, { config } from './axiosClient';

const merchantApi = {
  registerMerchant(token: string, data: MerchantInfo): Promise<MerchantInfo> {
    const url = `/merchants`;
    return axiosClient.post(url, data, config(token));
  },

  getMerchant(token: string): Promise<MerchantInfo> {
    const url = `/merchants`;
    return axiosClient.get(url, config(token));
  },

  checkIsMerchant(token: string): Promise<boolean> {
    const url = `/merchants/check`;
    return axiosClient.get(url, config(token));
  },
};

export default merchantApi;
