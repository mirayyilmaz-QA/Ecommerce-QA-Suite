const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'hierarchy',
    jsonFile: 'bdd-tests/reports/cucumber_report.json',
    output: 'bdd-tests/reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Chrome",
        "Platform": "MacOS",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    }
};

reporter.generate(options);