export interface OrderCreateInformation {
  id?: string;
  merchantId: number;
  currency: string;
  productInformation: {
    productId: number;
    quantity: number;
  };
  qrcodeLink?: string;
  qrContent?: string;
}
