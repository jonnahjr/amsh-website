const nodemailer = require('nodemailer');

const hosts = ['mail1.ethionet.et', 'mail2.ethionet.et', 'mail3.ethionet.et', 'mail4.ethionet.et'];
const ports = [25, 587, 465];

async function scan() {
    for (const host of hosts) {
        for (const port of ports) {
            console.log(`Scanning ${host}:${port}...`);
            const transporter = nodemailer.createTransport({
                host: host,
                port: port,
                secure: port === 465,
                auth: { user: 'admin@amsh.gov.et', pass: 'Jonnahjnr@0945628075YONas' },
                connectionTimeout: 5000
            });
            try {
                await transporter.verify();
                console.log(`✅ SUCCESS on ${host}:${port}!`);
                return;
            } catch (err) {
                console.log(`❌ ${host}:${port} failed: ${err.message}`);
            }
        }
    }
}

scan();
