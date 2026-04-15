const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql');
const content = fs.readFileSync(sqlPath, 'utf8');

const lines = content.split('\n');
const departments = [];

for (const line of lines) {
    if (line.includes('INSERT INTO `departments`')) {
        const valuesMatch = line.match(/VALUES \('(.*?)', '(.*?)',/);
        if (valuesMatch) {
            departments.push(valuesMatch[2]);
        }
    }
}

console.log(`\nTotal Departments Found: ${departments.length}`);
departments.forEach((name, i) => {
    console.log(`${i + 1}. ${name}`);
});
