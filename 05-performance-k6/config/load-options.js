export const loadOptions = {
    scenarios: {
        standard_load: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 5 },
                { duration: '20s', target: 5 },
                { duration: '5s', target: 0 },
            ],
        },
    },

    thresholds: {
        http_req_duration: ['p(95)<800'],
        http_req_failed: ['rate<0.01'],
    },
};

export const smokeTest = {
    scenarios: {
        smoke_test: {
            executor: 'constant-vus',
            vus: 1,
            duration: '10s',
        },
    },

    thresholds: {
        http_req_failed: ['rate<0.01'],
    },
};

export const averageLoad = {
    scenarios: {
        average_load: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 5 },
                { duration: '20s', target: 5 },
                { duration: '5s', target: 0 },
            ],
        },
    },

    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01'],
    },

};

export const mixedTrafficLoad = {
    scenarios: {
        browsing_traffic: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '10s', target: 10 },
                { duration: '20s', target: 10 },
                { duration: '5s', target: 0 },
            ],
            exec: 'browseFlow',
        },
        product_traffic: {
            executor: 'constant-vus',
            vus: 2,
            duration: '35s',
            exec: 'productViewFlow',
        },
    },
    thresholds: {

        'http_req_failed': ['rate<0.01'],
        'http_req_duration{scenario:browsing_traffic}': ['p(95)<300'],
        'http_req_duration{scenario:product_traffic}': ['p(95)<600'],
    },
};