const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, '..', 'FINAL_AMSH_DB_WITH_DATA.sql'),
    path.join(__dirname, '..', 'amsh-backend-plesk-READY', 'AMSH_FIX_DATABASE.sql')
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        
        // Remove lines that look like "I N S E R T" (spaced out corruption)
        const cleanedLines = lines.filter(line => {
            const isCorrupted = /I N S E R T|V A L U E S|d e p a r t m e n t s/.test(line) && !line.includes('INSERT INTO');
            return !isCorrupted;
        });

        let newContent = cleanedLines.join('\n');
        
        // Ensure the Psychiatry block is at the very end and correctly formatted
        const psychBlock = `
-- ============================================================
-- PSYCHIATRY DEPARTMENT & SERVICES ADDITION
-- ============================================================
REPLACE INTO \`departments\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`image\`, \`icon\`, \`categoryId\`, \`categoryName\`, \`order\`, \`isActive\`, \`showOnHome\`, \`createdAt\`, \`updatedAt\`) VALUES 
('cmppsych0001m02xzhmuegb1', 'Psychiatry Department', 'psychiatry', 'The centerpiece of AMSH, specializing in comprehensive mental health care, diagnostic psychiatry, and innovative therapeutic interventions.', 'https://api.amsh.gov.et/uploads/psychiatry-dept.png', '🧠', 'cmmds3hbt0001rlburs89vghr', 'Clinical Departments', 1, 1, 1, '2026-04-09 09:00:00', '2026-04-09 09:00:00');

REPLACE INTO \`services\` (\`id\`, \`name\`, \`slug\`, \`description\`, \`content\`, \`icon\`, \`departmentId\`, \`order\`, \`isActive\`, \`showOnHome\`, \`createdAt\`, \`updatedAt\`) VALUES 
('cmpsvc10001m02xzhmuegb1', 'General Adult Psychiatry', 'adult-psychiatry', 'Comprehensive diagnosis and treatment for a wide range of mental health conditions in adults.', '<p>Providing evidence-based care including medication management and psychotherapy.</p>', '👥', 'cmppsych0001m02xzhmuegb1', 1, 1, 1, '2026-04-09 09:00:00', '2026-04-09 09:00:00'), 
('cmpsvc20001m02xzhmuegb1', 'Child & Adolescent Mental Health', 'child-psychiatry', 'Specialized mental health support for children and teenagers, focusing on developmental and emotional well-being.', '<p>Helping children overcome behavioral and emotional challenges in a supportive environment.</p>', '👶', 'cmppsych0001m02xzhmuegb1', 2, 1, 1, '2026-04-09 09:00:00', '2026-04-09 09:00:00'), 
('cmpsvc30001m02xzhmuegb1', 'Forensic Psychiatry Services', 'forensic-psychiatry-dept', 'Professional psychiatric evaluation and treatment for individuals involved with the legal system.', '<p>Expert forensic assessments and rehabilitation services.</p>', '⚖️', 'cmppsych0001m02xzhmuegb1', 3, 1, 1, '2026-04-09 09:00:00', '2026-04-09 09:00:00');
`;

        // Check if the block is already there (roughly)
        if (!newContent.includes('PSYCHIATRY DEPARTMENT & SERVICES ADDITION')) {
            // Remove previous partial/corrupted psych additions if they exist
            newContent = newContent.replace(/-- Psychiatry Department Additions[\s\S]*$/, '');
            newContent += psychBlock;
        }

        fs.writeFileSync(file, newContent);
        console.log(`Cleaned and updated ${file}`);
    }
});
