import { Currency, ListParams, ListResponse, Network } from 'models';
import axiosClient from './axiosClient';

const currencyApi = {
  getAllCurrency(params: ListParams): Promise<ListResponse<Currency>> {
    const url = `/api/common/currencies`;
    return axiosClient.get(url, { params });
  },

  getCurrencyById(id: number): Promise<Currency> {
    const url = `/setting/api/common/currencies/${id}`;
    return axiosClient.get(url);
  },

  getAllNetwork(params: ListParams): Promise<ListResponse<Network>> {
    const url = `/setting/api/common/currencies/networks`;
    return axiosClient.get(url, { params });
  },
};

export default currencyApi;
