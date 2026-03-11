import { test as setup } from '@playwright/test';
import { testUsers } from '../testData/user';
import fs from 'fs';
import path from 'path';

setup('authenticate @sanity', async ({ request }) => {

    const response = await request.post('/auth/login', {
        data: testUsers.guest
    });

    if (!response.ok()) {
        throw new Error(`Login failed: ${response.status()}`);
    }

    const authDir = path.join(process.cwd(), '.auth');

    // Create folder if it doesn't exist
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
    }

    const storagePath = path.join(authDir, 'user.json');

    await request.storageState({ path: storagePath });

    console.log('Authentication setup complete. State saved to .auth/user.json');


});