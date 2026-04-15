const fs = require('fs');
const path = require('path');

const targetStr = "'cmppsych0001m02xzhmuegb1', 'Psychiatry Department', 'psychiatry', 'The centerpiece of AMSH, specializing in comprehensive mental health care, diagnostic psychiatry, and innovative therapeutic interventions.', NULL";
const replacementStr = "'cmppsych0001m02xzhmuegb1', 'Psychiatry Department', 'psychiatry', 'The centerpiece of AMSH, specializing in comprehensive mental health care, diagnostic psychiatry, and innovative therapeutic interventions.', 'https://api.amsh.gov.et/uploads/psychiatry-dept.png'";

const files = [
    path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql'),
    path.join(__dirname, '..', 'amsh-backend-plesk-READY', 'AMSH_FIX_DATABASE.sql')
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(targetStr)) {
            content = content.replace(new RegExp(targetStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacementStr);
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        } else {
            console.log(`String not found in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
