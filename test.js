// Run this file with: node convert-private-key.js
import fs from 'fs';

// Load your actual Firebase JSON file
const json = JSON.parse(fs.readFileSync('./server/config/firebase-service-account.json', 'utf-8'));

// Convert private key safely
const escaped = json.private_key.replace(/\n/g, '\\n');

// Output the exact .env line
console.log(`FIREBASE_PRIVATE_KEY=${escaped}`);
