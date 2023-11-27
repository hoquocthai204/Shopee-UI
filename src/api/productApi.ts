import { ProductInfo } from 'models/product/productInfo';
import axiosClient, { config } from './axiosClient';

const productApi = {
  getProduct(id: number): Promise<ProductInfo> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  getAllProduct(): Promise<ProductInfo[]> {
    const url = `/products`;
    return axiosClient.get(url);
  },
  getAllPrivateProduct(token: string): Promise<ProductInfo[]> {
    const url = `/products/private`;
    return axiosClient.get(url, config(token));
  },
  createProduct(token: string, data: ProductInfo | FormData): Promise<ProductInfo> {
    const url = `/products`;
    return axiosClient.post(url, data, config(token));
  },
  deleteProduct(token: string, productId: number): Promise<void> {
    const url = `/products/${productId}`;
    return axiosClient.delete(url, config(token));
  },
  updateProduct(token: string, productId: number, data: ProductInfo): Promise<void> {
    const url = `/products/${productId}`;
    return axiosClient.put(url, data, config(token));
  },
};

export default productApi;
