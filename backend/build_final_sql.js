const fs = require('fs');

const schemaData = fs.readFileSync('AMSH_DB_MYSQL55.sql', 'utf8');
const insertsData = fs.readFileSync('FINAL_AMSH_DB_WITH_DATA.sql', 'utf8');

const finalContent = `SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

${schemaData}

-- OLD DATA INSERTS --
${insertsData}

SET FOREIGN_KEY_CHECKS = 1;
`;

fs.writeFileSync('AMSH_PRODUCTION_DEPLOY.sql', finalContent);
console.log('Successfully generated AMSH_PRODUCTION_DEPLOY.sql');
