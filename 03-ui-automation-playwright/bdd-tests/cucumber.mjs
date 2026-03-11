export default {
    formatOptions: {
        snippetInterface: 'async-await',
    },
    defaultTimeout: 30000,
    paths: ['./bdd-tests/features/**/*.feature'],
    import: ['./bdd-tests/steps/**/*.ts'],
    loader: ['ts-node/esm'],
    publishQuiet: true,
    format: ['progress', 'json:./bdd-tests/reports/cucumber_report.json']
};