
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function testEmail() {
    console.log('Starting SMTP test (INFO ACCOUNT)...');
    console.log('Host:', process.env.SMTP_INFO_HOST);
    console.log('Port:', process.env.SMTP_INFO_PORT);
    console.log('User:', process.env.SMTP_INFO_USER);
    console.log('Secure:', process.env.SMTP_INFO_SECURE);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_INFO_HOST,
        port: parseInt(process.env.SMTP_INFO_PORT || '465'),
        secure: process.env.SMTP_INFO_SECURE === 'true',
        auth: { user: process.env.SMTP_INFO_USER, pass: process.env.SMTP_INFO_PASS },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
    });

    try {
        console.log('Verifying connection...');
        await transporter.verify();
        console.log('Connection verified successfully!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: process.env.EMAIL_INFO_FROM,
            to: 'info@amsh.gov.et, jonasjjonas14@gmail.com', // Test recipient
            subject: 'SMTP TEST - Institutional Internal Node',
            text: 'This is a test email to verify SMTP configuration.',
            html: '<b>SMTP TEST</b><p>This is a test email to verify SMTP configuration.</p>'
        });
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('SMTP Error Detached:', error);
    }
}

testEmail();
