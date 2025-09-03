import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.DUMMYJSON_BASE_URL!;

export const login = async (): Promise<AxiosInstance> => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      username: process.env.DUMMYJSON_USERNAME,
      password: process.env.DUMMYJSON_PASSWORD,
    });

    const token = res.data.token;

    return axios.create({
      baseURL: BASE_URL,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error('Authentication failed');
  }
};
export const addToCart = async (
  client: AxiosInstance,
  userId: number,
  productId: number,
  quantity: number
) => {
  const res = await client.post('/carts/add', {
    userId,
    products: [{ id: productId, quantity }],
  });

  return res;
};

export const getCart = async (client: AxiosInstance, userId: number) => {
  const res = await client.get(`/carts/user/${userId}`);
  return res;
};

export const checkoutCart = async (cart: any) => {
  // Simulate checkout logic
  return { status: 'success', cartId: cart.id, total: cart.total };
};

export const clearCart = async (cart: any) => {
  // Simulate clearing the cart
  return { status: 'cleared', cartId: cart.id, products: [] };
};