require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);
if (process.env.DATABASE_URL.startsWith('mysql://')) {
    console.log('Starts with mysql://');
} else {
    console.log('Does NOT start with mysql://');
    console.log('First character char code:', process.env.DATABASE_URL.charCodeAt(0));
}
