export default {
    formatOptions: {
        snippetInterface: 'async-await',
    },
    paths: ['bdd-tests/features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['bdd-tests/steps/**/*.ts'],
    defaultTimeout: 30000,
    publishQuiet: true,
    format: ['json:bdd-tests/reports/cucumber_report.json', 'progress-bar']
};