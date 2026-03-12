const net = require('net');

const targets = [
    { host: 'mail.ethionet.et', port: 993, label: 'IMAPS' },
    { host: 'mail.ethionet.et', port: 587, label: 'Submission' },
    { host: 'mail.ethionet.et', port: 465, label: 'SMTPS' },
    { host: 'mail1.ethionet.et', port: 25, label: 'MX1-Standard' },
    { host: '196.189.189.1', port: 25, label: 'SPF-IP1' },
    { host: 'smtp.gmail.com', port: 587, label: 'Gmail' }
];

function check(index) {
    if (index >= targets.length) return;
    const { host, port, label } = targets[index];
    console.log(`📡 Probing ${label} (${host}:${port})...`);

    const socket = new net.Socket();
    socket.setTimeout(5000);

    socket.on('connect', () => {
        console.log(`✅ ${label} is REACHABLE!`);
        socket.destroy();
        check(index + 1);
    });

    socket.on('timeout', () => {
        console.log(`❌ ${label} TIMEOUT (Blocked)`);
        socket.destroy();
        check(index + 1);
    });

    socket.on('error', (err) => {
        console.log(`❌ ${label} ERROR: ${err.message}`);
        socket.destroy();
        check(index + 1);
    });

    socket.connect(port, host);
}

check(0);
