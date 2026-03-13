import { test, expect } from '@playwright/test';
import { getFreshProducts, getRandomQuantity, getActiveUser } from '../utils/apiUtils';
import { Cart, User } from '../utils/types';

test.describe('E-commerce API Flow', () => {

  let user: User;

  test.beforeEach(async ({ request }) => {
    user = await getActiveUser(request);
  });

  test('Get Active User Profile', async ({ request }) => {

    const response = await request.get('/auth/me');
    expect(response.status()).toBe(200);

    const user = await response.json();

    expect(user).toMatchObject({
      id: expect.any(Number),
      username: expect.any(String)

    });

  });


  test('Products Schema & Data Integrity @sanity', async ({ request }) => {
    const response = await request.get('/products');
    const jsonData = await response.json();

    // Schema Validation
    expect(response.status()).toBe(200);
    expect(jsonData.products.length).toBeGreaterThan(0);

    expect(jsonData.products[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      price: expect.any(Number)
    });

  });

  test('Create Cart with Price Validation', async ({ request }) => {

    const products = await getFreshProducts(request);
    const qty1 = getRandomQuantity();
    const qty2 = getRandomQuantity();


    const response = await request.post('/carts/add', {
      data: {
        userId: user.id,
        products: [
          { id: products[0].id, quantity: qty1 },
          { id: products[1].id, quantity: qty2 }
        ]
      }
    });

    expect(response.status()).toBe(201);
    const cart: Cart = await response.json();
    expect(cart.products.length).toBe(2);

    // Logic Validation (Shadow Math). Price * Qty for each product
    const expectedTotal =
      (products[0].price * qty1) + (products[1].price * qty2);
    expect(cart.total).toBeCloseTo(expectedTotal, 1);
    console.log(`Verified cart for user ${user.id} with total: ${cart.total}`);
  });


});

test.describe('Negative & Edge Case -(Business Rule Validation)', () => {

  let user: User;

  test.beforeEach(async ({ request }) => {
    user = await getActiveUser(request);
  });



  test('Business Rule Gap: Zero Quantity', async ({ request }) => {
    const products = await getFreshProducts(request);


    const response = await request.post('/carts/add', {
      data: {
        userId: user.id,
        products: [{ id: products[0].id, quantity: 0 }]
      }
    });

    // Documentation of the API's behavior: Expected 400 but API currently allows zero quantity. This test documents a business logic flaw.
    expect(response.status()).toBe(201);

    const jsonData = await response.json();
    expect(jsonData.total).not.toBe(0);


  });

  test('Business Rule Gap: Out of Stock Check', async ({ request }) => {
    const products = await getFreshProducts(request);
    const excessiveQty = products[0].stock + 100; // Force it to exceed stock


    const response = await request.post('/carts/add', {

      data: {
        userId: user.id,
        products: [{ id: products[0].id, quantity: excessiveQty }]
      }
    });

    expect(response.status()).toBe(201);
    console.log('Confirmed: API still allows checkout exceeding stock.');
  });

});