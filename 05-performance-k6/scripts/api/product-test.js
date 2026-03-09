import { check, sleep } from 'k6';
import { loadOptions } from '../../config/load-options.js';
import { getProduct } from '../../services/product-service.js';
import { handleSummary } from '../../reports/report.js';

export { handleSummary };

export const options = loadOptions;

export default function () {

    const productId = Math.floor(Math.random() * 100) + 1;

    const res = getProduct(productId);

    check(res, {
        'Product: status is 200': (r) => r.status === 200,
        'Product: response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}