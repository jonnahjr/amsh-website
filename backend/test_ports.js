
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testPort(port, secure) {
  console.log(`--- TESTING Port:${port} Secure:${secure} ---`);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_INFO_HOST,
    port: port,
    secure: secure,
    auth: { user: process.env.SMTP_INFO_USER, pass: process.env.SMTP_INFO_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    await transporter.verify();
    console.log(`✅ Connection OK on Port ${port}!`);
    return true;
  } catch (err) {
    console.log(`❌ Failed on Port ${port}: ${err.message}`);
    return false;
  }
}

async function run() {
    await testPort(465, true);
    await testPort(587, false);
    await testPort(25, false);
}

run();
