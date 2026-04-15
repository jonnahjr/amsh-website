const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql');
const content = fs.readFileSync(sqlPath, 'utf8');

const match = content.match(/INSERT INTO `departments` VALUES (.*);/s);
if (match) {
    const valuesStr = match[1];
    // Split by values like ('...', '...', ...)
    const departments = valuesStr.split('),(');
    console.log(`Total Departments: ${departments.length}`);
    
    // Extract names (assuming name is the 2nd column)
    departments.forEach((dept, index) => {
        const columns = dept.split("','");
        const name = columns[1]?.replace(/^'|'$/g, '');
        console.log(`${index + 1}. ${name}`);
    });
} else {
    console.log('No departments found in SQL.');
}
