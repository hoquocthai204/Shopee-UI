export interface ProductInfo {
  id?: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  merchantId?: number;
  category: string;
}
