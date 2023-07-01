import { UserInformation } from 'models/user/userInformation';
import axiosClient, { config } from './axiosClient';

const qrCodeApi = {
  generateQrCode(token: string, id: number): Promise<any> {
    const url = `/qr-code/${id}`;
    return axiosClient.get(url, config(token));
  },
};

export default qrCodeApi;
