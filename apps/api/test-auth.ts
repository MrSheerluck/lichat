// Test different path formats
import { auth } from "./src/lib/auth";

const paths = [
    "http://localhost:8000/api/auth/session",
    "http://localhost:8000/session",
    "http://localhost:3000/api/auth/session",
];

for (const path of paths) {
    console.log(`\nTesting: ${path}`);
    const testRequest = new Request(path);

    auth.handler(testRequest)
        .then((response) => {
            console.log(`  Status: ${response.status}`);
            return response.text();
        })
        .then((text) => {
            console.log(`  Body: ${text || "(empty)"}`);
        })
        .catch((error) => {
            console.error(`  Error: ${error.message}`);
        });
}

// Wait for all promises
await new Promise(resolve => setTimeout(resolve, 2000));
