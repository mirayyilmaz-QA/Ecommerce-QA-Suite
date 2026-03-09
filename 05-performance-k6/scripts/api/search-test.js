import { check, sleep } from 'k6';
import { loadOptions } from '../../config/load-options.js';
import { searchProducts } from '../../services/product-service.js';
import { handleSummary } from '../../reports/report.js';

export { handleSummary };

const data = JSON.parse(open('../../data/products.json'));

export const options = loadOptions;

export default function () {

    const term = data.search_terms[Math.floor(Math.random() * data.search_terms.length)];

    const res = searchProducts(term);

    check(res, {

        'Search: status is 200': (r) => r.status === 200,
        'Search: products found': (r) => r.json().products.length >= 0,
    });

    sleep(1);
}