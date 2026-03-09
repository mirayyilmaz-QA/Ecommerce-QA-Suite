import { check, sleep, group } from 'k6';
import { getProduct, searchProducts } from '../services/product-service.js';
import { mixedTrafficLoad } from '../config/load-options.js';

import { handleSummary } from '.././reports/report.js';

export { handleSummary };

const productsData = JSON.parse(open('../data/products.json'));

export const options = mixedTrafficLoad;

// searcher
export function browseFlow() {
    const terms = productsData.search_terms;
    const term = terms[Math.floor(Math.random() * terms.length)];

    group('Search Journey', function () {
        const res = searchProducts(term);
        check(res, { 'search successful': (r) => r.status === 200 });
        sleep(1);
    });
}

// viewer
export function productViewFlow() {

    const productId = Math.floor(Math.random() * 50) + 1;

    group('Product Detail Journey', function () {
        const res = getProduct(productId);
        check(res, { 'product page ok': (r) => r.status === 200 });
        sleep(2);
    });
}