
const nodemailer = require('nodemailer');
require('dotenv').config();

async function test() {
  const host = '213.55.96.132';
  const port = 25;
  const secure = false;
  const user = 'info@amsh.gov.et';
  const pass = 'Amsh@1234';

  console.log(`--- TESTING Port:${port} Host:${host} ---`);

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: { user: user, pass: pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
  });

  try {
    const info = await transporter.sendMail({
        from: user,
        to: 'jonasjjonas14@gmail.com',
        subject: 'SMTP TEST (Port 25)',
        html: 'SMTP Working on port 25 with IP.',
    });
    console.log(`✅ Success: ${info.response}`);
  } catch (err) {
    console.log(`❌ Failed: ${err.message}`);
  }
}

test();
