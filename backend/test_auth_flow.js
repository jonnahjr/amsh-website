const axios = require('axios');

async function testFullFlow() {
    try {
        console.log('Testing Login...');
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@amsh.gov.et',
            password: 'Admin@AMSH2024!'
        });
        const token = loginRes.data.token;
        console.log('Login Success. Token:', token.substring(0, 20) + '...');

        console.log('Testing /auth/me...');
        const meRes = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Me Success:', meRes.data.user.email);
    } catch (err) {
        console.error('Flow Failed:', err.response ? err.response.data : err.message);
    }
}

testFullFlow();
