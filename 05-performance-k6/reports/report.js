import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {

        "05-performance-k6/reports/summary.html": htmlReport(data),
        //stdout: JSON.stringify(data),
    };
}