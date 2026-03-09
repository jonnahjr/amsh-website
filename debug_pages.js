const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testPages() {
    try {
        console.log('Testing GET /pages...');
        const res = await axios.get(`${API_URL}/pages`);
        console.log('GET /pages Status:', res.status);
        console.log('GET /pages Data Structure:', Object.keys(res.data));
        console.log('Sample Data:', JSON.stringify(res.data, null, 2).substring(0, 500));
    } catch (error) {
        console.error('GET /pages Error:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

testPages();
