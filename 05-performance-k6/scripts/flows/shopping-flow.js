import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../../config/environment.js';
import { getProduct, searchProducts } from '../../services/product-service.js';
import { averageLoad } from '../../config/load-options.js';

import { handleSummary } from '../../reports/report.js';

export { handleSummary };

const productsData = JSON.parse(open('../../data/products.json'));
const usersData = JSON.parse(open('../../data/users.json'));

export const options = averageLoad;

export function setup() {
    const allUsers = usersData.users;
    const user = allUsers[Math.floor(Math.random() * allUsers.length)];

    console.log(`Running test with user: ${user.username}`);

    const payload = JSON.stringify({
        username: user.username,
        password: user.password,
    });

    const params = { headers: { 'Content-Type': 'application/json' } };
    const res = http.post(`${BASE_URL}/auth/login`, payload, params);

    check(res, {
        'Login successful': (r) => r.status === 200,
    });

    return { token: res.json().accessToken };
}

export default function (data) {
    const token = data.token;

    const searchTerms = productsData.search_terms;
    const term = searchTerms[Math.floor(Math.random() * searchTerms.length)];

    const searchRes = searchProducts(term);

    check(searchRes, {
        'Search ok': (r) => r.status === 200,
    });

    const productList = searchRes.json().products;

    if (productList && productList.length > 0) {
        const randomProduct = productList[Math.floor(Math.random() * productList.length)];

        sleep(1);

        const productRes = getProduct(randomProduct.id, token);

        check(productRes, {
            'Product details loaded': (r) => r.status === 200,
        });
    }

    sleep(1);
}