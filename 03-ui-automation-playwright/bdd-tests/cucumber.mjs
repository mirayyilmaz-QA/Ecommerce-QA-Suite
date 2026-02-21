export default {
    formatOptions: {
        snippetInterface: 'async-await',
    },
    defaultTimeout: 30000,
    paths: ['bdd-tests/features/**/*.feature'],
    // Use 'require' instead of 'import' here for better compatibility with ts-node/register
    require: ['bdd-tests/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    publishQuiet: true,
    format: ['json:bdd-tests/reports/cucumber_report.json', 'progress-bar']
};