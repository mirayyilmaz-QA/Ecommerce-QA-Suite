import http from 'k6/http';
import { BASE_URL } from '../config/environment.js';

export function getProduct(productId, token) {
    const params = {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    };
    return http.get(`${BASE_URL}/products/${productId}`, params);
}

export function searchProducts(term) {
    return http.get(`${BASE_URL}/products/search?q=${term}`);
}