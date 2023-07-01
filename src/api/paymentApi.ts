import { PaymentStatusInfo } from 'models/payment/paymentStatusInfo';
import { PaymentStripeRequest } from 'models/payment/paymentStripeRequest';
import { PaymentStripeResponse } from 'models/payment/paymentStripeResponse';
import axiosClient, { config } from './axiosClient';

const paymentApi = {
  createStripePayment(data: PaymentStripeRequest, token: string): Promise<PaymentStripeResponse> {
    const url = `/payment/custom-checkout-session`;
    return axiosClient.post(url, data, config(token));
  },
  checkPaymentStatus(sessionId: String, token: string): Promise<PaymentStatusInfo> {
    const url = `/payment/check/${sessionId}`;
    return axiosClient.get(url, config(token));
  },
};

export default paymentApi;
