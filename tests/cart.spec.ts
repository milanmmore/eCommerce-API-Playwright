
import { test, expect } from '@playwright/test';
import { login, addToCart } from '../utils/apiClient';

test('Add product to cart', async () => {
  const client = await login(); // scoped inside test
  const res = await client.post('/carts/add', {
    userId: 1,
      products: [{ id: 1, quantity: 2 }],
    }, {
  headers: { 'Content-Type': 'application/json' }
  });

  expect([200, 201]).toContain(res.status);
  expect(res.data.total).toBeGreaterThan(0);
});

test('Add product to cart using utility', async () => {
  const client = await login(); // scoped inside test
  const res = await addToCart(client, 1, 1, 2); // userId, productId, quantity

  expect([200, 201]).toContain(res.status);
  expect(res.data.total).toBeGreaterThan(0);
  expect(res.data.products.length).toBeGreaterThan(0);
});