export interface TransactionInfo {
  id: number;
  walletId: number;
  orderInfo: {
    id: number;
    status: string;
    expireTime: string;
    qrcodeLink: string;
    qrContent: string;
    merchantId: number;
    productInfo: {
      id: number;
      name: string;
      description: string;
      images: string[];
      price: number;
      merchantId: number;
      category: string;
    };
  };
  type: string;
  credit: string;
  amount: number;
}
