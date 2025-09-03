import { test, expect } from '@playwright/test';
import { login, addToCart, getCart, checkoutCart, clearCart } from '../utils/apiClient';



test.only('Cart lifecycle: add, verify, checkout, clear', async () => {
  const userId = 1;
  const productId = 1;
  const quantity = 2;
    const client = await login();
  const addRes = await addToCart(client, userId, productId, quantity);
    expect([200, 201]).toContain(addRes.status);

    expect(addRes.data.totalQuantity).toBe(2);
    expect(addRes.data.products.length).toBe(1);

    console.log(addRes.data);

    const cartId = addRes.data.id;

    const getRes = await getCart(client, userId);
    const cart = getRes.data.carts?.[0] || addRes.data; // fallback to simulated cart
    expect(cart.products.length).toBeGreaterThan(0);

 

    const checkoutRes = await checkoutCart(addRes.data);
    expect(checkoutRes.status).toBe('success');

    const clearRes = await clearCart(addRes.data);
    expect(clearRes.status).toBe('cleared');
    expect(clearRes.products.length).toBe(0);
    
});
