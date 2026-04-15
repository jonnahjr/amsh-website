const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql');
const content = fs.readFileSync(sqlPath, 'utf8');

const slugs = ["'adult-psychiatry'", "'child-psychiatry'", "'psychiatry'"];
slugs.forEach(slug => {
    const lines = content.split('\n');
    for (const line of lines) {
        if (line.includes(slug)) {
            console.log(`MATCH FOUND FOR ${slug}:`);
            console.log(line);
        }
    }
});
