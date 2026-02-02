import crypto from 'crypto';

// Generate a random secret of 256 bits (32 bytes) and encode it in hex
const accessTokenSecret = crypto.randomBytes(32).toString('hex');
const refreshTokenSecret = crypto.randomBytes(32).toString('hex');

console.log('Access Token Secret:', accessTokenSecret);
console.log('Refresh Token Secret:', refreshTokenSecret);
