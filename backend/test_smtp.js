
const nodemailer = require('nodemailer');
require('dotenv').config();

async function test(toEmail) {
  console.log('--- TESTING SMTP to: ' + toEmail + ' ---');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_INFO_HOST,
    port: parseInt(process.env.SMTP_INFO_PORT || '465'),
    secure: process.env.SMTP_INFO_SECURE === 'true',
    auth: { user: process.env.SMTP_INFO_USER, pass: process.env.SMTP_INFO_PASS },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_INFO_FROM,
      to: toEmail,
      subject: 'SMTP TEST (Institutional)',
      html: '<h1>TESTING SMTP</h1><p>Sent from AMSH Backend</p>',
    });
    console.log('✅ Success (' + toEmail + '): ' + info.response);
  } catch (err) {
    console.error('❌ Failed (' + toEmail + '): ', err.message);
  }
}

async function run() {
    await test('info@amsh.gov.et'); // Staff (Institutional)
    await test('jonasjjonas14@gmail.com'); // Researcher (External)
}

run();
