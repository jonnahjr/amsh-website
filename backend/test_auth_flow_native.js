const http = require('http');

function post(url, data) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(data);
        const req = http.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        }, (res) => {
            let resBody = '';
            res.on('data', chunk => resBody += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, data: JSON.parse(resBody) }));
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

function get(url, token) {
    return new Promise((resolve, reject) => {
        const req = http.request(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, (res) => {
            let resBody = '';
            res.on('data', chunk => resBody += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, data: JSON.parse(resBody) }));
        });
        req.on('error', reject);
        req.end();
    });
}

async function run() {
    try {
        console.log('Step 1: Login');
        const login = await post('http://localhost:5000/api/auth/login', {
            email: 'admin@amsh.gov.et',
            password: 'Admin@AMSH2024!'
        });
        console.log('Login Status:', login.statusCode);
        
        if (login.statusCode !== 200) {
            console.error('Login Failed:', login.data);
            return;
        }

        const token = login.data.token;
        console.log('Step 2: Get Me');
        const me = await get('http://localhost:5000/api/auth/me', token);
        console.log('Me Status:', me.statusCode);
        console.log('Me User:', me.data.user.email);
        
    } catch (e) {
        console.error('Error:', e);
    }
}

run();
