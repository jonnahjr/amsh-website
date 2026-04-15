const fs = require('fs');

let content = fs.readFileSync('AMSH_PRODUCTION_DEPLOY.sql', 'utf8');

// Replace "CREATE TABLE `table_name`" with "DROP TABLE IF EXISTS `table_name`; \n CREATE TABLE `table_name`"
content = content.replace(/CREATE TABLE `([\w_]+)`/g, 'DROP TABLE IF EXISTS `$1`;\nCREATE TABLE `$1`');

fs.writeFileSync('AMSH_PRODUCTION_DEPLOY.sql', content, 'utf8');
console.log('Added DROP TABLE IF EXISTS statements successfully.');
