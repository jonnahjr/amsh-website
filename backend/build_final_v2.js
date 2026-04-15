const fs = require('fs');

let schemaStr = fs.readFileSync('AMSH_DB_MYSQL55.sql', 'utf8');
let dumpStr = fs.readFileSync('SUPABASE_ULTIMATE_SETUP_MYSQL55.sql', 'utf8');

// The original file SUPABASE_ULTIMATE_SETUP_MYSQL55.sql contains CREATE statements then INSERT statements.
// We just want to extract everything starting from the first "INSERT INTO".
let firstInsertIdx = dumpStr.indexOf('INSERT INTO');
let justInserts = dumpStr.slice(firstInsertIdx);

// Append the inserts to the schema
let finalSql = `SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS = 0;\n\n${schemaStr}\n\n-- OLD DATA INSERTS --\n${justInserts}\n\nSET FOREIGN_KEY_CHECKS = 1;\n`;

// Fix MySQL 5.5 specific constraints
// 1. Remove BOM characters if any
finalSql = finalSql.replace(/\uFEFF/g, '');

// 2. Fix DATETIME DEFAULT CURRENT_TIMESTAMP not supported, use TIMESTAMP for auto dates
finalSql = finalSql.replace(/DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP/g, 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP');
finalSql = finalSql.replace(/DATETIME NULL DEFAULT CURRENT_TIMESTAMP/g, 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP');

// Write out the pristine final deploy script
fs.writeFileSync('AMSH_PRODUCTION_DEPLOY.sql', finalSql, 'utf8');
console.log('Successfully completed building the final SQL script strictly with literal inserts.');
