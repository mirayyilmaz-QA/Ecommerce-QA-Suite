import http from 'k6/http';
import { check, sleep } from 'k6';
import { smokeTest } from '../../config/load-options.js';
import { BASE_URL } from '../../config/environment.js';
import { handleSummary } from '../../reports/report.js';

export { handleSummary };

const usersData = JSON.parse(open('../../data/users.json'));

export const options = smokeTest;

export default function () {
    const allUsers = usersData.users;
    const user = allUsers[Math.floor(Math.random() * allUsers.length)];

    const payload = JSON.stringify({
        username: user.username,
        password: user.password,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(`${BASE_URL}/auth/login`, payload, params);

    check(res, {
        'Login: status is 200': (r) => r.status === 200,
        'Login: token returned': (r) => r.json().accessToken !== undefined,
    });

    if (res.status !== 200) {
        console.error(`Login failed for ${user.username}: ${res.status} - ${res.body}`);
    }

    sleep(1);
}