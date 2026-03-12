const nodemailer = require('nodemailer');

const testCases = [
    { host: 'mail1.ethionet.et', port: 25, label: 'Standard MX1' },
    { host: 'mail2.ethionet.et', port: 25, label: 'Standard MX2' },
    { host: 'smtp.gmail.com', port: 587, label: 'Gmail submission' }
];

async function run() {
    for (const test of testCases) {
        console.log(`📡 Trying ${test.label} (${test.host}:${test.port})...`);
        const transporter = nodemailer.createTransport({
            host: test.host,
            port: test.port,
            secure: test.port === 465,
            auth: {
                user: 'admin@amsh.gov.et',
                pass: 'Jonnahjnr@0945628075YONas'
            },
            tls: { rejectUnauthorized: false }
        });

        try {
            await transporter.verify();
            console.log(`✅ ${test.label} WORKS!`);
            return;
        } catch (err) {
            console.log(`❌ ${test.label} FAILED: ${err.message}`);
        }
    }
    console.log('\n❌ All direct institutional relays failed. Please use Google Workspace / App Password if available.');
}

run();
