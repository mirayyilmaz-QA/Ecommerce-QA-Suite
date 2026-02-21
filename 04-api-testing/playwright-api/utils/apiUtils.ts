import { APIRequestContext } from "@playwright/test";
import { User, Product } from "./types";

export async function getFreshProducts(request: APIRequestContext): Promise<Product[]> {
    const response = await request.get('/products');
    if (!response.ok()) {
        throw new Error(`Failed to fetch products. Status: ${response.status()}`)
    }
    const responseBody = await response.json();

    if (!responseBody.products || responseBody.products.length < 2) {
        throw new Error('Not enough products returned to create a cart.');
    }
    return responseBody.products;
}

export async function getActiveUser(request: APIRequestContext): Promise<User> {

    const response = await request.get('/auth/me');

    if (!response.ok()) {
        throw new Error('Failed to fetch active user');
    }
    return response.json();

}

export function getRandomQuantity(min = 1, max = 3) {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}