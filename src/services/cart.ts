import { axiosInstance } from './instance';
import { CartResponse } from './dto/cart';


export const fetchCart = async (): Promise<CartResponse> => {
  const { data } = await axiosInstance.get<CartResponse>('/cart');

  return data;
};

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartResponse> => {
  const { data } = await axiosInstance.patch<CartResponse>('/cart/' + id, { quantity });

  return data;
};
