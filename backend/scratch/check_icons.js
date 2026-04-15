const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql');
const content = fs.readFileSync(sqlPath, 'utf8');

const lines = content.split('\n');
const icons = new Set();

for (const line of lines) {
    if (line.includes('INSERT INTO `departments`')) {
        // Simple regex to find the icon field (6th column usually)
        const matches = line.match(/VALUES \('.*?', '.*?', '.*?', '.*?', (.*?), (.*?),/);
        if (matches) {
            icons.add(matches[2]);
        }
    }
}

console.log("Found Icons in Database:");
icons.forEach(icon => console.log(icon));
