import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function testPages() {
    try {
        const res = await axios.get(`${API_URL}/pages`);
        console.log('GET /pages Status:', res.status);
        console.log('GET /pages Data:', JSON.stringify(res.data, null, 2));
    } catch (error: any) {
        console.error('GET /pages Error:', error.message);
        if (error.response) {
            console.error('Response Data:', error.response.data);
        }
    }
}

testPages();
