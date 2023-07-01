import { WalletInformation } from 'models/wallet/walletInformation';
import axiosClient, { config } from './axiosClient';

const walletApi = {
  getWallet(token: string): Promise<WalletInformation> {
    const url = `wallets`;
    return axiosClient.get(url, config(token));
  },

  checkWalletExisted(token: string): Promise<boolean> {
    const url = `wallets/check-exist`;
    return axiosClient.get(url, config(token));
  },
};

export default walletApi;
